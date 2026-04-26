## 🔍 Infinite Scroll Implementation (ProductList)

This project uses the **Intersection Observer API** to implement infinite scrolling in a clean and performant way.

---

### 🧠 Core Concepts Used

- `useState` → Manage products, pagination, and loading state
- `useEffect` → Handle side effects (API calls + observer setup)
- `useRef` → Reference the loader element
- `IntersectionObserver` → Detect when user reaches bottom

---

### ⚙️ How It Works

1. Initial render → empty product list
2. Loader element is observed using `IntersectionObserver`
3. When loader becomes visible:
   - API request is triggered
   - New products are appended
4. Process repeats until no more data

---

### 🌐 API Used

👉 https://dummyjson.com/products

Supports pagination via:
- `limit` → number of items per request
- `skip` → offset

---

### 🔑 Code Breakdown

#### 📦 State Management

```jsx
const [products, setProducts] = useState([]);
const [page, setPage] = useState(0);
const [hasMore, setHasMore] = useState(true);
```

### 🔗 Loader Reference

```JavaScript
const loaderRef = useRef(null);
```

### 🌍 Fetch Products

```JavaScript
const fetchProducts = async () => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${productsPerPage}&skip=${page * productsPerPage}`
  );

  const data = await response.json();

  if (data.products.length < productsPerPage) {
    setHasMore(false);
  } else {
    setProducts(prev => [...prev, ...data.products]);
    setPage(prev => prev + 1);
  }
};
```

### 👁️ Intersection Observer

```JavaScript
const onIntersection = (items) => {
  const loaderItem = items[0];

  if (loaderItem.isIntersecting && hasMore) {
    fetchProducts();
  }
};

const observer = new IntersectionObserver(onIntersection);
```

### 🔄 Observer Setup & Cleanup

```JavaScript
useEffect(() => {
  if (observer && loaderRef.current) {
    observer.observe(loaderRef.current);
  }

  return () => {
    if (observer) observer.disconnect();
  };
}, [hasMore, page]);
```

### 🖼️ Rendering Products

```JavaScript
{products.map(product => (
  <CardComponent
    key={product.id}
    title={product.title}
    description={product.description}
    image={product.thumbnail}
    price={product.price}
  />
))}
```

### ⏳ Loader Element

```JavaScript
{hasMore && <div ref={loaderRef}>Loading more products ...</div>}
```

### ⚡ Why Intersection Observer?

| Feature         | Scroll Event  | Intersection Observer |
| --------------- | ------------- | --------------------- |
| Performance     | ❌ Heavy       | ✅ Efficient           |
| Accuracy        | ❌ Manual calc | ✅ Automatic           |
| Code Complexity | ❌ Higher      | ✅ Cleaner             |


### 🚀 Best Practices Applied

- ✅ Lazy loading data
- ✅ Avoid unnecessary API calls
- ✅ Cleanup observer on unmount
- ✅ Append data instead of replacing
- ✅ Stop fetching when no more data

### ⚠️ Possible Improvements (Interview Bonus)

- Add loading spinner/skeleton UI
- Add error handling (try/catch)
- Debounce API calls
- Use useCallback for fetch function
- Add API caching

### 💡 Interview Tip

`If asked:`

👉 "Why use `IntersectionObserver` instead of scroll?"

Answer:

It improves performance by avoiding continuous scroll event listeners and only triggers when the target element becomes visible in the viewport.