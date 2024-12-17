# 🚀 Custom API Hub

**Custom API Hub**, geliştiricilerin hızlıca kullanabileceği, **JWT tabanlı kimlik doğrulama**, **API Key Yönetimi** ve **Rate Limiting** gibi özelliklere sahip **Node.js** ve **MongoDB** tabanlı bir API platformudur. Projeyi klonlayarak kendi API'lerinizi oluşturabilir ve genişletebilirsiniz.

---

## 📋 Proje Özellikleri

- **JWT Authentication**: Kullanıcı Küyıt ve Giriş işlemleri.
- **API Key Yönetimi**: Her kullanıcıya özel API anahtarı oluşturma.
- **Rate Limiting**: Kullanıcı başına istek sınırlandırma (100 istek/saat).
- **Todo API Örneği**: Korunan bir endpoint örneği.
- **Swagger UI**: Tüm API'lerin test edilebileceği dokümantasyon.

---

## 🚀 Kurulum Adımları

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/salihkaankoc/custom-api-hub.git
cd custom-api-hub
```

### 2. Gerekli Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın

Proje kök dizininde `.env` dosyası oluşturup aşağıdaki ayarları ekleyin:

```env
MONGO_URI="yourmongodburl"
PORT=5000
JWT_SECRET="yoursecretkey"
```

- **MONGO_URI**: MongoDB bağlantı URL'niz.
- **JWT_SECRET**: JWT token'ları için gizli anahtar.

### 4. Sunucuyu Çalıştırın

```bash
npm run dev
```

Sunucu şu adreste çalışacaktır: [http://localhost:5000](http://localhost:5000)

---

## 🔗 API Endpoint'leri

### **1. Kullanıcı Kayıt Olma**
- **URL**: `/api/auth/register`  
- **Method**: `POST`  
- **Body**:  
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "123456"
  }
  ```
- **Başarılı Yanıt**:
  ```json
  {
    "message": "Kullanıcı başarıyla kaydedildi."
  }
  ```

---

### **2. Kullanıcı Giriş Yapma**
- **URL**: `/api/auth/login`  
- **Method**: `POST`  
- **Body**:  
  ```json
  {
    "email": "johndoe@example.com",
    "password": "123456"
  }
  ```
- **Başarılı Yanıt**:
  ```json
  {
    "message": "Giriş başarılı.",
    "token": "JWT_TOKEN"
  }
  ```

---

### **3. API Anahtarı Oluşturma**
- **URL**: `/api/key/generate`  
- **Method**: `POST`  
- **Header**:  
  ```http
  Authorization: Bearer JWT_TOKEN
  ```
- **Başarılı Yanıt**:
  ```json
  {
    "message": "API Anahtarı oluşturuldu.",
    "key": "api_abc123456"
  }
  ```

---

### **4. Todo Listesi (API Anahtarı ile Korunan)**
- **URL**: `/api/todos`  
- **Method**: `GET`  
- **Header**:  
  ```http
  x-api-key: YOUR_API_KEY
  ```
- **Başarılı Yanıt**:
  ```json
  {
    "message": "Todo listesi",
    "data": [
      { "id": 1, "task": "Proje oluştur", "completed": true },
      { "id": 2, "task": "API anahtarı ekle", "completed": true },
      { "id": 3, "task": "Rate limiting yap", "completed": false }
    ]
  }
  ```

---

## 📄 Swagger Dokümantasyonu

API'lerin tüm detaylarını **Swagger UI** üzerinden görebilir ve test edebilirsiniz:

**URL**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🛠 Kullanılan Teknolojiler

- **Backend**: Node.js, Express.js
- **Veritabanı**: MongoDB
- **Kimlik Doğrulama**: JWT (JSON Web Token)
- **Rate Limiting**: Custom Middleware
- **API Dokümantasyonu**: Swagger UI
- **Diğer**: Bcrypt, CORS, Dotenv

---

## 🤝 Katkıda Bulunma

Katkıda bulunmak istiyorsanız:  
1. Bu projeyi **fork**'layın.  
2. Yeni bir **branch** oluşturun: `git checkout -b yeni-ozellik`.  
3. Değişikliklerinizi yapın ve commit edin: `git commit -m "Yeni özellik ekledim"`.  
4. **Pull request** gönderin.

---

## 📃 Lisans

Bu proje **MIT Lisansı** altında yayınlanmıştır. Detaylar için [LICENSE](LICENSE) dosyasını inceleyin.

---

## ⭐ Projeyi Destekleyin!

Bu proje işinize yaradıysa:  
- ⭐ **Yıldız vermeyi unutmayın**!  
- 💬 Geri bildirimlerinizi paylaşın.  
- 🔗 Projeyi LinkedIn veya sosyal medya üzerinden paylaşarak diğer geliştiricilere ulaşmasını sağlayabilirsiniz.

---


