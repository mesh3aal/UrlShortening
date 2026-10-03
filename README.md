<div dir="rtl" align="center">

# 🔗 ShortLink — Distributed URL Shortener

### منصة متكاملة وسريعة لتقصير الروابط وتتبعها، مبنية بمعمارية سحابية موزعة عبر **.NET Aspire** وواجهة **React 19** الحديثة ومحمية بـ **Keycloak**.

<br/>

[![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![.NET Aspire](https://img.shields.io/badge/Aspire-13.4-blueviolet?style=for-the-badge&logo=dotnet&logoColor=white)](https://learn.microsoft.com/en-us/dotnet/aspire/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Keycloak](https://img.shields.io/badge/Keycloak-OAuth2%20%2F%20OIDC-gray?style=for-the-badge&logo=keycloak&logoColor=white)](https://www.keycloak.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%204.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

<!-- Flagship Demo GIF -->
<img src="./docs/assets/app-demo.gif" alt="ShortLink Demo Walkthrough" width="95%" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);" />

<br/>

</div>

---

<div dir="rtl">

## ⚡ أبرز المزايا البصرية

| 🚀 السرعة والتحويل الفوري | 🔐 أمان واحترافية | 📊 إدارة وتحليلات مباشرة | 📱 مشاركة سريعة بـ QR |
| :---: | :---: | :---: | :---: |
| كاش فائق السرعة عبر **Redis** لإعادة توجيه لحظية دون استنزاف قاعدة البيانات. | مصادقة قوية ببروتوكول **OAuth 2.0 / OpenID Connect + PKCE** بواسطة **Keycloak**. | لوحة تحكم تعرض روابطك مع عداد نقرات متزامن في الوقت الفعلي. | توليد فوري لرموز **QR Code** ونسخ الروابط المخصصة بضغطة زر. |

<br/>

### 🎬 تجربة التخصيص والتحليلات الحية (Live Interaction & Analytics)

</div>

<div align="center">
  <img src="./docs/assets/features-demo.gif" alt="Features & QR Analytics Demo" width="95%" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);" />
</div>

<br/>

---

<div dir="rtl">

## 📸 معرض الواجهات — Visual Showcase

</div>

<div align="center">

| 🌐 الواجهة الرئيسية (Landing Page) | 👤 حساب المستخدم والجلسة (User Profile) |
| :---: | :---: |
| <img src="./docs/assets/ui-landing.png" width="100%" style="border-radius: 8px;" /> | <img src="./docs/assets/ui-user-menu.png" width="100%" style="border-radius: 8px;" /> |

| 🛠️ بطاقات المزايا (Features Grid) | 💳 خطط الأسعار (Pricing Plans) |
| :---: | :---: |
| <img src="./docs/assets/ui-features.png" width="100%" style="border-radius: 8px;" /> | <img src="./docs/assets/ui-pricing.png" width="100%" style="border-radius: 8px;" /> |

</div>

<br/>

---

<div dir="rtl">

## 🏗️ المعمارية وتدفق البيانات — Architecture

يعمل المشروع بنموذج الخدمات السحابية الموزعة المدارة بالكامل عبر **.NET Aspire AppHost**:

</div>

```mermaid
graph LR
    subgraph UI ["💻 Client Side"]
        ReactApp["⚛️ React 19 + Vite<br/>TanStack Router & Tailwind"]
    end

    subgraph Auth ["🔐 Identity & Access"]
        KC["Keycloak Server<br/>OAuth2 / OIDC / PKCE"]
    end

    subgraph Backend ["⚙️ Aspire Microservices"]
        API["🚀 urlshort API (.NET 10)<br/>Minimal APIs + OpenTelemetry"]
        Redis[("⚡ Redis Cache<br/>IDistributedCache")]
        Postgres[("🗄️ PostgreSQL<br/>EF Core")]
    end

    ReactApp -->|"1. تسجيل الدخول"| KC
    ReactApp -->|"2. استدعاء مع JWT Token"| API
    API -->|"3. تحقق الجلسة"| KC
    API -->|"4. استرجاع سريع"| Redis
    API -->|"5. تخزين دائم"| Postgres

    style ReactApp fill:#0284c7,stroke:#0369a1,color:#fff
    style KC fill:#475569,stroke:#334155,color:#fff
    style API fill:#7c3aed,stroke:#6d28d9,color:#fff
    style Redis fill:#dc2626,stroke:#b91c1c,color:#fff
    style Postgres fill:#2563eb,stroke:#1d4ed8,color:#fff
```

---

<div dir="rtl">

## 📡 نقاط النهاية — API Endpoints

| الطريقة | نقطة النهاية | الوصف | الحماية |
| :--- | :--- | :--- | :---: |
| `POST` | `/shorturl` | إنشاء رابط مختصر جديد (عشوائي 7 خانات أو Custom Alias) | 🔒 Bearer JWT |
| `GET` | `/{alias}` | تحويل فوري للرابط الأصلي وتحديث عداد الزيارات عبر الكاش | 🌐 عام |
| `GET` | `/myurls` | استعراض كافة الروابط الخاصة بالمستخدم الحالي مع إحصائيات النقرات | 🔒 Bearer JWT |
| `DELETE` | `/{id}` | حذف رابط مختصر يملكه المستخدم | 🔒 Bearer JWT |

<br/>

---

## 🚀 التشغيل السريع — Quick Start

### 1️⃣ المتطلبات المسبقة
- **Docker Desktop** (لتشغيل حاويات PostgreSQL, Redis, Keycloak)
- **.NET 10 SDK** + Aspire Workload
- **Node.js 20+**

### 2️⃣ خطوات التشغيل

```bash
# تشغيل جميع خدمات الباك إند عبر .NET Aspire
dotnet run --project urlshort.AppHost
```

```bash
# تشغيل واجهة المستخدم React (في نافذة تيرمينال أخرى)
cd urls
npm install
npm run dev
```

> 💡 **لوحة تحكم Aspire Dashboard:** ستفتح تلقائياً عند التشغيل لمراقبة السجلات (Logs)، التتبعات (Traces)، والخدمات النشطة.

---

## 👨‍💻 المطور — Developer

<div align="center">
  <img src="./docs/assets/developer-about.png" alt="Meshaal Jamal - Developer" width="750" style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);" />
</div>

<br/>

<div align="center">

صُمم وطُوّر بواسطة **مشعل جمال (Meshaal Jamal)** — مهندس برمجيات Full-Stack 🚀

</div>

</div>
