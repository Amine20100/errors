#!/bin/bash

# هذا السكربت يقوم بتثبيت وإعداد مشروع صفحات الأخطاء على خادم Ubuntu/Debian.
# يجب تشغيل هذا السكربت كمستخدم لديه صلاحيات sudo.

# -----------------------------------------------------------------------------
# 1. تعريف المتغيرات
# -----------------------------------------------------------------------------
PROJECT_DIR="/var/www/error-pages-project"
REPO_URL="https://github.com/your-username/your-error-pages-repo.git" # استبدل هذا برابط مستودعك
DOMAIN_OR_IP="your_domain_or_ip" # استبدل هذا بعنوان IP الخاص بخادمك أو اسم النطاق

# -----------------------------------------------------------------------------
# 2. وظائف المساعدة
# -----------------------------------------------------------------------------
log_info() {
    echo "[INFO] $1"
}

log_success() {
    echo "[SUCCESS] $1"
}

log_error() {
    echo "[ERROR] $1"
    exit 1
}

check_command() {
    command -v "$1" >/dev/null 2>&1 || log_error "$1 غير مثبت. يرجى تثبيته يدوياً أو التحقق من اتصال الإنترنت."
}

# -----------------------------------------------------------------------------
# 3. التحقق من صلاحيات المستخدم
# -----------------------------------------------------------------------------
if [ "$(id -u)" -ne 0 ]; then
    log_error "يجب تشغيل هذا السكربت بصلاحيات الجذر (root) أو باستخدام sudo."
fi

# -----------------------------------------------------------------------------
# 4. تحديث نظام التشغيل
# -----------------------------------------------------------------------------
log_info "تحديث قائمة الحزم وتثبيت التحديثات..."
sudo apt update && sudo apt upgrade -y || log_error "فشل تحديث النظام."
log_success "تم تحديث النظام بنجاح."

# -----------------------------------------------------------------------------
# 5. تثبيت Node.js و npm
# -----------------------------------------------------------------------------
log_info "تثبيت Node.js و npm..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - || log_error "فشل إضافة مستودع NodeSource."
sudo apt-get install -y nodejs || log_error "فشل تثبيت Node.js."

check_command node
check_command npm

log_success "تم تثبيت Node.js و npm بنجاح."

# -----------------------------------------------------------------------------
# 6. تثبيت pnpm
# -----------------------------------------------------------------------------
log_info "تثبيت pnpm..."
sudo npm install -g pnpm || log_error "فشل تثبيت pnpm."
check_command pnpm
log_success "تم تثبيت pnpm بنجاح."

# -----------------------------------------------------------------------------
# 7. تثبيت Nginx
# -----------------------------------------------------------------------------
log_info "تثبيت Nginx..."
sudo apt install -y nginx || log_error "فشل تثبيت Nginx."
sudo systemctl start nginx || log_error "فشل بدء Nginx."
sudo systemctl enable nginx || log_error "فشل تمكين Nginx عند بدء التشغيل."
log_success "تم تثبيت Nginx وبدء تشغيله بنجاح."

# -----------------------------------------------------------------------------
# 8. إعداد جدار الحماية (UFW)
# -----------------------------------------------------------------------------
log_info "إعداد جدار الحماية (UFW)..."
sudo ufw enable || log_error "فشل تمكين UFW."
sudo ufw allow ssh || log_error "فشل السماح باتصالات SSH."
sudo ufw allow http || log_error "فشل السماح باتصالات HTTP."
sudo ufw allow https || log_error "فشل السماح باتصالات HTTPS."
sudo ufw status verbose || log_error "فشل عرض حالة UFW."
log_success "تم إعداد جدار الحماية بنجاح."

# -----------------------------------------------------------------------------
# 9. استنساخ المشروع من Git
# -----------------------------------------------------------------------------
log_info "استنساخ مشروع صفحات الأخطاء من Git..."
if [ -d "$PROJECT_DIR" ]; then
    log_info "المجلد $PROJECT_DIR موجود بالفعل. حذف المجلد القديم..."
    sudo rm -rf "$PROJECT_DIR" || log_error "فشل حذف المجلد القديم."
fi
sudo mkdir -p "$(dirname "$PROJECT_DIR")" || log_error "فشل إنشاء دليل المشروع الأب."
sudo git clone "$REPO_URL" "$PROJECT_DIR" || log_error "فشل استنساخ المستودع."
log_success "تم استنساخ المشروع بنجاح إلى $PROJECT_DIR."

# -----------------------------------------------------------------------------
# 10. تثبيت تبعيات المشروع وبنائه
# -----------------------------------------------------------------------------
log_info "تثبيت تبعيات المشروع وبنائه..."
cd "$PROJECT_DIR" || log_error "فشل الانتقال إلى دليل المشروع."
pnpm install || log_error "فشل تثبيت تبعيات pnpm."
pnpm run build || log_error "فشل بناء المشروع."
log_success "تم تثبيت التبعيات وبناء المشروع بنجاح."

# -----------------------------------------------------------------------------
# 11. تكوين Nginx
# -----------------------------------------------------------------------------
log_info "تكوين Nginx لتقديم تطبيق React..."
NGINX_CONF="/etc/nginx/sites-available/error-pages"

sudo bash -c "cat > $NGINX_CONF <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN_OR_IP;

    root $PROJECT_DIR/dist;
    index index.html index.htm;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
EOF"

# إزالة أي رابط رمزي قديم وتفعيل التكوين الجديد
if [ -L "/etc/nginx/sites-enabled/error-pages" ]; then
    sudo rm "/etc/nginx/sites-enabled/error-pages" || log_error "فشل إزالة الرابط الرمزي القديم لـ Nginx."
fi
sudo ln -s "$NGINX_CONF" "/etc/nginx/sites-enabled/" || log_error "فشل إنشاء الرابط الرمزي لـ Nginx."

log_info "اختبار تكوين Nginx..."
sudo nginx -t || log_error "فشل اختبار تكوين Nginx. يرجى التحقق من الملف $NGINX_CONF."

log_info "إعادة تشغيل Nginx لتطبيق التغييرات..."
sudo systemctl restart nginx || log_error "فشل إعادة تشغيل Nginx."
log_success "تم تكوين Nginx بنجاح."

# -----------------------------------------------------------------------------
# 12. (اختياري) إعداد HTTPS باستخدام Certbot
# -----------------------------------------------------------------------------
log_info "التحقق مما إذا كان Certbot مثبتاً..."
if ! command -v certbot &> /dev/null; then
    log_info "تثبيت Certbot..."
    sudo snap install core || log_error "فشل تثبيت snap core."
    sudo snap refresh core || log_error "فشل تحديث snap core."
    sudo snap install --classic certbot || log_error "فشل تثبيت Certbot."
    sudo ln -s /snap/bin/certbot /usr/bin/certbot || log_error "فشل إنشاء رابط رمزي لـ Certbot."
    log_success "تم تثبيت Certbot بنجاح."
else
    log_info "Certbot مثبت بالفعل."
fi

# إذا كان DOMAIN_OR_IP هو اسم نطاق وليس IP، حاول إعداد HTTPS
if [[ "$DOMAIN_OR_IP" =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
    log_info "تم اكتشاف عنوان IP. تخطي إعداد HTTPS التلقائي. يمكنك إعداده يدوياً لاحقاً."
else
    log_info "محاولة إعداد HTTPS باستخدام Certbot للنطاق $DOMAIN_OR_IP..."
    sudo certbot --nginx -d "$DOMAIN_OR_IP" --non-interactive --agree-tos --email your_email@example.com || log_error "فشل إعداد HTTPS باستخدام Certbot. يرجى التحقق من إعدادات DNS للنطاق."
    log_success "تم إعداد HTTPS بنجاح للنطاق $DOMAIN_OR_IP."
fi

log_success "تم الانتهاء من إعداد مشروع صفحات الأخطاء بنجاح!"
log_info "يمكنك الآن الوصول إلى تطبيقك عبر: http://$DOMAIN_OR_IP أو https://$DOMAIN_OR_IP"


