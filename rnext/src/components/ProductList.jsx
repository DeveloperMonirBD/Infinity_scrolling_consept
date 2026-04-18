import { useEffect, useRef, useState } from 'react';
import { CardComponent } from './CardComponents';

const productsPerPage = 10;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${page * productsPerPage}`);

            const data = await response.json();

            if (data.products.length < productsPerPage) {
                setHasMore(false)
            } else {
                setProducts(prevProducts => [...prevProducts, ...data.products]);
                setPage(prevPage => prevPage + 1);
            }
        };

        const onIntersection = items => {
            const loaderItem = items[0];
            if (loaderItem.isIntersecting && hasMore) {
                fetchProducts();
            }
        };

        const observer = new IntersectionObserver(onIntersection);

        if (observer && loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        //cleanup
        return () => {
            if (observer) observer.disconnect();
        };
    }, [hasMore, page]);

    return (
        <div>
            <div className="text-red-500">Product List</div>

            {/* product list will be loaded here  */}

            {products.map(product => (
                <CardComponent title={product.title} description={product.description} image={product.thumbnail} price={product.price} key={product.id} />
            ))}

            {hasMore && <div ref={loaderRef}>Loading more products ...</div>}
        </div>
    );
};

export default ProductList;
