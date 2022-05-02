import React,{useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import {Shopify_URL,Token_val} from "./constants";

const styles = {
  card: {
    margin: "10px 20px"
  },
  media: {
    height: 400 //set card height
  }
};

function MediaCard(props) {
  
  const { classes, image, headline, description, isMoving ,key , productID ,data,ExistedCardID, handleCartId} = props;
  const [buttonVal, setButtonvalue] = useState(true);
  const [createdCartID,setCreatedCartID] = useState("");

  const handlebuttonclick=()=>{
    setButtonvalue(!buttonVal)
  }

  const createCart = `mutation {
    cartCreate(
      input: {
        lines: [
          {
            merchandiseId: "${productID}"
            quantity: 1
          }
        ]
      }
    ) {
      cart {
        id
      }
    }
  }`

  const UpdateCreateCart = `mutation cartLinesAdd{
    cartLinesAdd(
        cartId: "${ExistedCardID}"
        lines: [
            {
              merchandiseId: "${productID}"
              quantity: 4
            }
          ]
      ) {
      cart {
        id
      }
    }
  }`
  
  const CheckoutQuery = `
  query checkoutURL {
    cart(id: "${createdCartID}") {
      checkoutUrl
    }
  }
  `
  
  const handleCheckout = async () =>{
    await axios.post(Shopify_URL, 
      {
        query:CheckoutQuery,
    }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': `${Token_val}`,
        }
      }).then((response) => {
        window.open(response.data.data.cart.checkoutUrl)
      },
      (error) => {
        console.log( error.response.status);
      }
    )
  } 

  const handleAddCart =async()=>{
    
    if(ExistedCardID != null){
      await axios.post(Shopify_URL, 
        {
          query:UpdateCreateCart,
      }, {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': `${Token_val}`,
          }
        }).then((response) => {
          setCreatedCartID(response?.data?.data?.cartLinesAdd?.cart?.id);
          handleCartId(response?.data?.data?.cartLinesAdd?.cart?.id);
        },
        (error) => {
          console.log(error.response.status)
        }
      )
    }
    else{
      await axios.post(Shopify_URL, 
        {
          query:createCart,
      }, {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': `${Token_val}`,
          }
        }).then((response) => {
          setCreatedCartID(response?.data?.data?.cartCreate?.cart?.id);
          handleCartId(response?.data?.data?.cartCreate?.cart?.id);          
        },
        (error) => {
          console.log( error.response.status)
        }
      )
    }
  }

  return (
    <Card className={classes.card} key={key} >
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={headline} key={key}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" key={key}>
          {data.variants.edges[0].node.priceV2.currencyCode}.{Math.round(data.variants.edges[0].node.priceV2.amount)}
          </Typography>
          <Typography component="p" key={key}>{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {buttonVal && <Button size="small" color="primary" variant="outlined" onClick={()=>{handlebuttonclick();handleAddCart();}} fullWidth>
          Add to Cart
        </Button>}
        {!buttonVal && <Button size="small" color="primary" variant="outlined" onClick={handleCheckout} fullWidth>
          Go to Checkout
        </Button>}
      </CardActions>
    </Card>
  );
}
export default withStyles(styles)(MediaCard);