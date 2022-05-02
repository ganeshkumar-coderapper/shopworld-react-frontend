import React,{useState,useEffect}  from "react";
import Carousel from "react-multi-carousel";
import MediaCard from "./MediaCard";
import axios from 'axios';
import {Shopify_URL,Token_val} from "./constants";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
};

const queryDef = `query ProductByTag {
  products(first:10, query:"tag:featured") {
    edges {
      node {
        title
        featuredImage{
            url
        }
        variants(first:1) {
            edges{
                node{
                    id
                    priceV2{
                        currencyCode
                        amount
                    }
                }
            }
        }
      }
    }
  }
}`

const ProductList = ({ deviceType }) => {
  const [productData,setProductData] = useState([]);
  const [cartID,setCartId] = useState(null);

  
  useEffect(
    ()=>{
    const fetchdata = async ()=>{
    await axios.post(Shopify_URL, 
      {
        query:queryDef,
    }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': `${Token_val}`,
        }
      }).then((response) => {
        setProductData(response.data.data.products.edges)
      },
      (error) => {
        console.log(error.response.status);
      }
    )}
    fetchdata();
    },
    []//dependency array
    )

    const cartCreateId =(id)=>{
      setCartId(id);
    }
    
  return (
    <>
    <Carousel
      ssr
      partialVisbile
      deviceType={deviceType}
      itemClass="image-item"
      responsive={responsive}
    >
      {productData?.map((val,i) => {
        return (
         <MediaCard image={val?.node?.featuredImage?.url} productID={val?.node?.variants?.edges[0]?.node?.id} description={val?.node?.title} data={val?.node} ExistedCardID={cartID} handleCartId={cartCreateId} key={i}/>
        );
      })}
    </Carousel>
    </>
  );
};

export default ProductList;
