import { isNullishCoalesce } from "typescript"

export let Navbar=[
    {
        "role":"farmer",
        "class":"fa fa-cart-plus menuicon",
        "name":"Add Product",
        "link":"/add-items",
    },

    {
        "role":"consumer",
        "class":"fa fa-shopping-bag",
        "name":"Shop",
        "link":"/items",
    },

    {
        "role":"consumer",
        "class":"fa fa-shopping-cart menuicon",
        "name":"Cart",
        "link":"/cart",
    },
    {
        "role":"consumer",
        "class":"fa fa-list-alt",
        "name":"Orders",
        "link":"/orders",
    },
    {
        "role":"consumeronly",
        "class":"fa fa-shopping-bag",
        "name":"Shop",
        "link":"/items",
    },
    {
        "role":"consumeronly",
        "class":"fa fa-shopping-cart menuicon",
        "name":"Cart",
        "link":"/cart",
    },
    {
        "role":"consumeronly",
        "class":"fa fa-list-alt",
        "name":"Orders",
        "link":"/orders",
    },
    {
        "role":"newuser",
        "class":"fa fa-shopping-bag",
        "name":"Shop",
        "link":"/items",
    },
    {
        "role":"newuser",
        "class":"fa fa-shopping-cart menuicon",
        "name":"Cart",
        "link":"/cart",
    },
    {
        "role":"newuser",
        "class":"fa fa-list-alt",
        "name":"Orders",
        "link":"/orders",
    },
    {
        "role":"farmer",
        "class":"fa fa-truck",
        "name":"Pickup",
        "link":"/pickup",
    },
    {
        "role":"farmer",
        "class":"fa fa-plane",
        "name":"Shipment",
        "link":"/shipment",
    }, //yahan se
    {
        "role":"farmer",
        "class":"fa fa-hand-stop-o",
        "name":"Bids",
        "link":"/farmerbid",
    },
    {
        "role":"consumer",
        "class":"fa fa-hand-stop-o",
        "name":"Bids",
        "link":"/consumerbid",
    },
    {
        "role":"consumeronly",
        "class":"fa fa-hand-stop-o",
        "name":"Bids",
        "link":"/consumerbid",
    },
    {
        "role":"newuser",
        "class":"fa fa-hand-stop-o",
        "name":"Bids",
        "link":"/signin",
    },
    
    {
        "role":"farmer",
        "class":"fa fa-handshake-o",
        "name":"Aid",
        "link":"/aid",
    },

    
]

export let NavDrawer=[
    {
        "role":"farmer",
        "class":"fa fa-home menuicon",
        "name":"Home",
        "link":"/home/farmer",
    },
    {
        "role":"consumer",
        "class":"fa fa-home menuicon",
        "name":"Home",
        "link":"/home",
    },
    {
        "role":"consumeronly",
        "class":"fa fa-home menuicon",
        "name":"Home",
        "link":"/home",
    },
    {
        "role":"newuser",
        "class":"fa fa-home menuicon",
        "name":"Home",
        "link":"/home",
    },
    
    {
        "role":"farmer",
        "class":"fa fa-cart-plus menuicon",
        "name":"Add Product",
        "link":"/add-items",
    },
    {
        "role":"consumer",
        "class":"fa fa-shopping-cart menuicon",
        "name":"Cart",
        "link":"/cart",
    },
    {
        "role":"consumer",
        "class":"fa fa-list-alt",
        "name":"Orders",
        "link":"/orders",
    },
    {
        "role":"consumeronly",
        "class":"fa fa-shopping-cart menuicon",
        "name":"Cart",
        "link":"/cart",
    },
    {
        "role":"consumeronly",
        "class":"fa fa-list-alt",
        "name":"Orders",
        "link":"/orders",
    },
    {
        "role":"newuser",
        "class":"fa fa-shopping-cart menuicon",
        "name":"Cart",
        "link":"/cart",
    },
    {
        "role":"newuser",
        "class":"fa fa-list-alt",
        "name":"Orders",
        "link":"/orders",
    },
    {
        "role":"farmer",
        "class":"fa fa-truck",
        "name":"Pickup",
        "link":"/pickup",
    },
    {
        "role":"farmer",
        "class":"fa fa-plane",
        "name":"Shipment",
        "link":"/shipment",
    },
    {
        "role":"farmer",
        "class":"fa fa-hand-stop-o",
        "name":"Bids",
        "link":"/farmerbid",
    },
    {
        "role":"consumer",
        "class":"fa fa-hand-stop-o",
        "name":"Bids",
        "link":"/consumerbid",
    },
    {
        "role":"consumeronly",
        "class":"fa fa-hand-stop-o",
        "name":"Bids",
        "link":"/consumerbid",
    },
    {
        "role":"newuser",
        "class":"fa fa-hand-stop-o",
        "name":"Bids",
        "link":"/signin",
    },
    {
        "role":"farmer",
        "class":"fa fa-handshake-o",
        "name":"Aid",
        "link":"/aid",
    }
    ,
    {
        "role":"consumer",
        "class":"fa fa-user",
        "name":"Profile",
        "link":"/profile",
    },
    {
        "role":"farmer",
        "class":"fa fa-user",
        "name":"Profile",
        "link":"/profile",
    }, 

    {
        "role":"farmer",
        "class":"fa fa-sign-in menuicon",
        "name":"Sign Out",
        "link":null,
        "func":null
    },

    {
        "role":"consumer",
        "class":"fa fa-sign-in menuicon",
        "name":"Sign Out",
        "link":null,
        "func":null
    }, 

    {
        "role":"consumeronly",
        "class":"fa fa-sign-in menuicon",
        "name":"Sign Out",
        "link":null,
        "func":null
    },
    
    {
        "role":"newuser",
        "class":"fa fa-sign-in menuicon",
        "name":"Sign In",
        "link":"/signin",
    },
    
    
]

export let dropdown = [
    {
        "role":"newuser",
        "class":"fa fa-sign-in menuicon",
        "name":"Sign In",
        "link":"/signin",
        "func":null,
    },

    {
        "role":"farmer",
        "class":"fa fa-sign-out menuicon",
        "name":"Sign Out",
        "link" : null,
        "func": null
    },

    {
        "role":"consumer",
        "class":"fa fa-sign-out menuicon",
        "name":"Sign Out",
        "link" : null,
        "func": null
    },
    {
        "role":"consumeronly",
        "class":"fa fa-sign-out menuicon",
        "name":"Sign Out",
        "link" : null,
        "func": null
    },
]