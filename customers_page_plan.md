# Warehouse Management Dashboard — خطة صفحة العملاء (Customers)

## الهدف من الملف
هذا الملف يحدد خطة تنفيذ صفحة **Customers** قبل كتابة الكود، بالترتيب الذي سنمشي به في المشروع. الهدف هو بناء الصفحة بطريقة منظمة وإعادة استخدام الـ components والـ custom hooks التي تم بناؤها بالفعل.

---

# 1. الحالة الحالية للمشروع

قبل البدء في Customers، تم تجهيز مجموعة من الأجزاء القابلة لإعادة الاستخدام:

- Sort & Filter في الصفحات الموجودة.
- Reusable Table.
- Reusable Table Toolbar.
- Empty State.
- No Search Result.
- Custom Hooks:
  - `useSort`
  - `useFilter`
  - `useLargestCategory`

## ملاحظة
لا نضيف `useSearch` لمجرد أن الاسم يبدو مناسبًا. سنراقب تكرار Search Logic في Customers، وإذا أصبح المنطق متكررًا فعلًا، وقتها نفصله في Custom Hook.

---

# 2. ترتيب تنفيذ صفحة Customers

سننفذ الصفحة بهذا الترتيب:

1. Data Model
2. UI / Page Structure
3. CRUD
4. Search
5. Filter
6. Sort
7. Validation
8. Empty States
9. Reuse Components & Hooks
10. Refactor & Code Review

لن نبدأ بالكود قبل تثبيت الـ Data Model.

---

# 3. المرحلة الأولى — Customer Data Model

أول قرار هو تحديد شكل الـ Customer Object.

شكل مبدئي مقترح:

```js
{
    id,
    name,
    email,
    phone,
    address,
    createdAt,
    updatedAt
}
```

## ملاحظات

- `id`: معرف فريد للعميل.
- `name`: اسم العميل.
- `email`: البريد الإلكتروني.
- `phone`: رقم الهاتف.
- `address`: العنوان.
- `createdAt`: وقت إنشاء العميل.
- `updatedAt`: آخر وقت تم فيه تعديل العميل.

## نقطة مهمة جدًا

لا نخزن اسم الـ Customer داخل أي Order مستقبلي.

عند إنشاء Orders، العلاقة تكون عن طريق:

```js
customerId
```

مثل العلاقة الحالية بين Product و Category:

```text
Product
   |
   | categoryId
   ↓
Category
```

وبالتالي لاحقًا:

```text
Order
   |
   | customerId
   ↓
Customer
```

---

# 4. المرحلة الثانية — تصميم صفحة Customers

الصفحة مبدئيًا تتكون من:

```text
Customers
│
├── Statistics / Cards
│
├── Table Toolbar
│
└── Customers Table
```

## Statistics

نحدد فقط الـ statistics التي لها قيمة فعلية.

مثال:

```text
Total Customers
```

ولا نضيف إحصائيات مرتبطة بالـ Orders قبل وجود Orders.

---

# 5. المرحلة الثالثة — Customers Table

سنستخدم الـ **Reusable Table** الموجود بالفعل.

الـ Table نفسه لا يعرف تفاصيل Customer.

الصفوف يتم تجهيزها من صفحة Customers ثم إرسالها إلى الـ Table.

مثال الفكرة:

```jsx
<Table
    columns={columns}
    rows={rows}
/>
```

والـ `rows` يتم بناؤها من بيانات العملاء.

## أعمدة مبدئية

- Name
- Email
- Phone
- Address
- Created At
- Actions

سنراجع الأعمدة أثناء تنفيذ UI، وليس شرطًا أن نحتفظ بها كلها.

---

# 6. المرحلة الرابعة — CRUD

## Create Customer

إنشاء:

```text
Add Customer
```

والـ Form يحتوي على البيانات المطلوبة.

مبدئيًا:

- Name
- Email
- Phone
- Address

---

## Read Customers

عرض العملاء داخل الـ Reusable Table.

---

## Update Customer

إنشاء:

```text
Edit Customer
```

مع إعادة استخدام الـ Modal/Form المناسب.

---

## Delete Customer

إضافة Delete Action لكل Customer.

ويجب تحديد هل الحذف يحتاج Confirmation Modal أم لا.

---

# 7. المرحلة الخامسة — Search

سنحدد أولًا ما الذي يستطيع المستخدم البحث عنه.

الاقتراح المبدئي:

```text
Search By
├── Name
├── Email
└── Phone
```

ويكون شكل الـ Toolbar مبدئيًا:

```text
[ Search... ] [ Search By ▼ ] [ Sort By ▼ ]
```

## قاعدة مهمة

الـ Search State والـ Data Logic يظلوا في الصفحة المسئولة عن Customers.

أما `Reusable Table Toolbar` فمسئوليته الأساسية هي عرض عناصر الـ Toolbar واستقبال القيم/التغييرات المطلوبة.

---

# 8. المرحلة السادسة — Filter

لا نضيف Filter لمجرد وجوده.

الـ Filter يجب أن يكون مبنيًا على بيانات موجودة فعلًا.

مثال محتمل مستقبلًا:

```text
All Customers
Customers With Orders
Customers Without Orders
```

لكن هذا النوع من الـ Filter يعتمد على وجود Orders.

لذلك إذا لم تكن Orders موجودة بعد، لا ننفذه الآن.

---

# 9. المرحلة السابعة — Sort

سنستخدم الـ `useSort` الموجود بالفعل.

الأنواع المبدئية الممكنة:

```text
Name A-Z
Name Z-A

Newest
Oldest
```

وإذا أصبح عندنا لاحقًا `totalSpent` أو بيانات Orders، يمكن إضافة:

```text
Highest Spending
Lowest Spending
```

لكن لا نضيفها قبل توفر البيانات المطلوبة.

---

# 10. المرحلة الثامنة — Validation

سننشئ Validation خاص بالـ Customer.

القواعد المبدئية:

### Name

```text
Required
```

### Email

```text
Required
Valid email format
```

### Phone

```text
Required
Valid phone format
```

### Address

```text
Required
```

القواعد النهائية تتحدد أثناء بناء الـ Form.

---

# 11. المرحلة التاسعة — Empty States

لدينا حالتان مختلفتان ويجب عدم دمجهما.

## الحالة الأولى: لا يوجد Customers أصلًا

مثال:

```text
No Customers Yet

Add your first customer.
```

ويكون معها زر:

```text
Add Customer
```

---

## الحالة الثانية: يوجد Customers لكن البحث لا يعيد نتائج

مثال:

```text
No Results Found

Try another search.
```

هذه ليست نفس حالة Empty State الأساسية.

---

# 12. المرحلة العاشرة — إعادة استخدام الـ Components

صفحة Customers يجب أن تستفيد من الأجزاء التي تم بناؤها:

```text
Reusable Table
Reusable Table Toolbar
Empty State
No Search Result
```

والـ Custom Hooks حسب الحاجة:

```text
useSort
useFilter
```

ولا نضيف Hook جديدة إلا إذا كان هناك منطق متكرر حقيقي.

---

# 13. هل نحتاج useSearch؟

ليس بالضرورة من البداية.

القرار يكون بعد تنفيذ Customers.

إذا أصبح Search Logic مكررًا بين:

```text
Products
Categories
Customers
```

نستخرج:

```text
useSearch
```

أما إذا كان بسيطًا ومختلفًا، فلا نعمل abstraction بدون داعٍ.

---

# 14. المرحلة الحادية عشرة — Refactor

بعد انتهاء الصفحة:

نراجع:

### Components

هل هناك كود مكرر؟

### State

هل كل State موجودة في المكان المناسب؟

### Logic

هل Search / Filter / Sort منفصلين بشكل واضح؟

### Reusability

هل نستخدم الـ Components الموجودة بدل إعادة كتابتها؟

### Naming

هل أسماء المتغيرات والـ functions تعبر عن وظيفتها؟

### Data relationships

هل الـ IDs والعلاقات صحيحة؟

---

# 15. الشكل النهائي المتوقع

```text
Customers Page
│
├── Statistics
│
├── Table Toolbar
│   ├── Search
│   ├── Search By
│   └── Sort By
│
├── Customers Table
│   ├── Customer Row
│   └── Actions
│
├── Add Customer Modal
├── Edit Customer Modal
└── Delete Confirmation
```

---

# 16. الـ Workflow الذي سنمشي به

لن نكتب الصفحة كلها مرة واحدة.

سنمشي خطوة بخطوة:

## Step 1
تثبيت Customer Data Model.

## Step 2
إنشاء State وتهيئة بيانات Customers.

## Step 3
بناء الـ Table والـ Columns.

## Step 4
Add Customer.

## Step 5
Edit Customer.

## Step 6
Delete Customer.

## Step 7
Search.

## Step 8
Filter.

## Step 9
Sort.

## Step 10
Validation.

## Step 11
Empty State / No Search Result.

## Step 12
Final Refactor + Code Review.

---

# 17. أهم قواعد التنفيذ

- لا نكرر Component موجود بالفعل.
- لا نضع Logic خاص بالـ Customer داخل Component عام.
- لا نعمل Custom Hook بدون سبب حقيقي.
- لا نخزن بيانات مشتقة إذا كان يمكن حسابها من البيانات الأصلية.
- لا نعتمد على أسماء بدل IDs في العلاقات.
- لا نضيف Features تعتمد على بيانات لم نبنها بعد.
- نفصل UI عن Data Logic قدر الإمكان.
- كل خطوة تتراجع قبل الانتقال للخطوة التالية.

---

# 18. أول خطوة عند بدء Customers

قبل كتابة أي Component أو Hook:

**نحدد Customer Object النهائي.**

بعدها نحدد:

```text
ما البيانات التي يحتاجها Customer؟
ما البيانات المطلوبة؟
ما البيانات الاختيارية؟
ما العلاقات المستقبلية؟
```

ثم نبدأ الكود.

---

## ملاحظة عن الـ Scope

هذه الخطة مبنية على تفاصيل المشروع والـ architecture التي تم تحديدها حتى الآن. أي قرار غير محسوم — مثل الـ Customer fields النهائية أو وجود Orders في هذه المرحلة — سنثبته قبل تنفيذ الجزء الذي يعتمد عليه، بدل افتراضه.
