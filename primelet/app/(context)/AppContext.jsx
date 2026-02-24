// "use client"
// import { useRouter } from 'next/navigation'
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from "axios";
// import { toast } from 'sonner';

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

// const AppContext = createContext()

// const AppContextProvider = ({ children }) => {
//   const currency = "$"
//   const [user, setUser] = useState(null)
//   const [categories, setCategories] = useState([])
//   const [products, setProduts] = useState([])
//   const [subTotal, setSubTotal] = useState(0)
//   const [totalAmount, setTotalAmount] = useState(0)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("")
//   const [cartItems, setCartItems] = useState([]);
//   const [loadingItemId, setLoadingItemId] = useState(null)
//   const router = useRouter();

//   const getCategories = async () => {
//     try {
//       const res = await axios.get("/api/categories")
//       if (res.data) {
//         setCategories(res.data.data)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const getProducts = async () => {
//     try {
//       const res = await axios.get("/api/products?populate=*&pagination[pageSize]=100")
//       if (res.data) {
//         console.log(res.data)
//         setProduts(res.data.data)
//       }
//     } catch (error) {

//     }
//   }


//   const registerUser = async (username, email, password) => {
//     try {
//       const res = await axios.post("/api/auth/local/register", {
//         username,
//         email,
//         password
//       })
//       return res.data;

//     } catch (error) {
//       console.log("RegisterUser error", error.message)
//     }
//   }

//   const loginUser = async (email, password) => {
//     try {
//       const res = await axios.post("/api/auth/local", {
//         identifier: email,
//         password: password
//       })
//       return res.data;

//     } catch (error) {
//       console.log("RegisterUser error", error.message)
//     }
//   }

//   const logout = async () => {
//     sessionStorage.clear()
//     router.push('/sign-in')
//     setUser(null)
//   }

//   //ADDING ITEMS TO THE CART.
//   const addToCart = async (data) => {
//     const jwt = sessionStorage.getItem("jwt")
//     if (!jwt) return null
//     try {
//       const res = await axios.post("/api/carts", data, {
//         headers: { Authorization: `Bearer ${jwt}` },
//       })
//       await refreshCart()  //update state after adding items
//       return res;
//     } catch (error) {
//       console.log("AddToCart error:", error.message)
//       return null
//     }
//   }

//   //FETCH CART ITEMS..
//   const fetchCartItems = async () => {
//     const jwt = sessionStorage.getItem("jwt")
//     if (!user?.id || !jwt) return []

//     try {
//       const res = await axios.get(`/api/carts?filters[userid][$eq]=${user.id}&populate=products.images`, {
//         headers: { Authorization: `Bearer ${jwt}` },
//       })
//       return res.data.data.map((item) => ({
//         id: item.documentId, //use documentId for API ops
//         name: item.products[0]?.name,
//         quantity: item.quantity,
//         amount: item.amount,
//         image: item.products[0]?.images?.[0]?.url,
//         price: item.products[0]?.price,
//         offerprice: item.products[0]?.offerprice,
//         product: item.products[0]?.id,
//       }))
//     } catch (error) {
//       console.log("FetchCartItems error", error.message)
//       return []
//     }
//   }


//   //REFRESH CART STATE (CALLED AFTER ADD/REMOVE OR NO USER CHANGE)
//   const refreshCart = async () => {
//     const items = await fetchCartItems()
//     setCartItems(items)
//   }

//   const removeFromCart = async (id) => {
//     setLoadingItemId(id)
//     const jwt = sessionStorage.getItem("jwt")
//     if (!id || !jwt) return

//     try {
//       const res = await axios.delete(`/api/carts/${id}`, {
//         headers: { Authorization: `Bearer ${jwt}` }
//       })
//       await refreshCart()   //update state right after the delete
//       toast.success("Remove from Cart")
//       return res
//     } catch (error) {
//       console.log("removeFromCart error:", error.message)
//     } finally {
//       setLoadingItemId(null)
//     }
//   }

//   const createOrder = async (payload) => {
//     const jwt = sessionStorage.getItem("jwt")
//     if (!jwt) return null

//     if (!payload) {
//       toast.error("Order data missing")
//       return null
//     }
//     try {
//       const res = await axios.post("/api/orders", payload, {
//         headers: { Authorization: `Bearer ${jwt}` }
//       })

//       if (res?.status >= 200 && res.status < 300) {
//         toast.success("Order placed successfully")
//         // CLEAR CART AND REDIRECT TO MY-ORDER PAGE.
//         for (const item of cartItems) {
//           await removeFromCart(item.id)
//         }
//         setCartItems([])    //immmediate ui clear
//         router.replace("/my-orders")
//         return res.data
//       }
//     } catch (error) {
//       toast.error("error placing the order")
//       console.log(error.message)
//     }
//   }

//   const getMyOrders = async () => {
//     const jwt = sessionStorage.getItem("jwt")
//     if (!user?.id || !jwt) return []

//     // /api/orders?filters[serid][$eq]=3&populate=orderedItems.product.images
//     // /api/carts?filters[userid][$eq]=${user.id}&populate=orderedItems.products.images

//     try {
//       const res = await axios.get(`/api/orders?filters[userid][$eq]=${user.id}&populate=orderedItems.product.images`, {
//         headers: { Authorization: `Bearer ${jwt}` }
//       })
//       return res.data.data.map((item) => ({
//         id: item.id,
//         createdAt: item.createdAt,
//         orderAmount: item.orderAmount,
//         paymentId: item.paymentId,
//         orderedItems: item.orderedItems,
//         orderStatus: item.orderStatus,
//       }))
//     } catch (error) {
//       console.log("Error getting orders:", error.message);
//       return [];
//     }
//   }



//   useEffect(() => {
//     getCategories();
//     getProducts();
//     const storedUser = sessionStorage.getItem("user")
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

//   useEffect(() => {
//     if (user) {
//       refreshCart()
//     } else {
//       setCartItems([])
//     }
//   }, [user])


//   const value = {
//     currency,
//     categories,
//     products,
//     subTotal,
//     setSubTotal,
//     totalAmount,
//     setTotalAmount,
//     router,
//     searchQuery,
//     setSearchQuery,
//     selectedCategory,
//     setSelectedCategory,
//     registerUser,
//     loginUser,
//     user,
//     setUser,
//     logout,
//     addToCart,
//     fetchCartItems,
//     cartItems,
//     setCartItems,
//     removeFromCart,
//     loadingItemId,
//     createOrder,
//     getMyOrders
//   }
//   return (
//     <div>
//       <AppContext.Provider value={value}>{children}</AppContext.Provider>
//     </div>
//   )
// }

// export default AppContextProvider
// export const useAppContext = () => useContext(AppContext)








"use client"; // MUST BE FIRST LINE
export const dynamic = "force-dynamic";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = "$";
  const router = useRouter();
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories
  const getCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      if (res?.data?.data) setCategories(res.data.data);
    } catch (err) {
      console.log("getCategories error", err);
    }
  };

  // Fetch products
  const getProducts = async () => {
    try {
      const res = await axios.get(
        "/api/products?populate=*&pagination[pageSize]=100"
      );
      if (res?.data?.data) setProducts(res.data.data);
    } catch (err) {
      console.log("getProducts error", err);
    }
  };

  // Register / Login
  const registerUser = async (username, email, password) => {
    try {
      const res = await axios.post("/api/auth/local/register", {
        username,
        email,
        password,
      });
      return res.data;
    } catch (err) {
      console.log("registerUser error", err);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/local", {
        identifier: email,
        password,
      });
      return res.data;
    } catch (err) {
      console.log("loginUser error", err);
    }
  };

  const logout = async () => {
    if (typeof window !== "undefined") sessionStorage.clear();
    setUser(null);
    router.push("/sign-in");
  };

  // CART FUNCTIONS
  const fetchCartItems = async () => {
    if (!user?.id || typeof window === "undefined") return [];
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) return [];

    try {
      const res = await axios.get(
        `/api/carts?filters[userid][$eq]=${user.id}&populate=products.images`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      return res?.data?.data?.map((item) => ({
        id: item?.documentId,
        name: item?.products?.[0]?.name || "",
        quantity: item?.quantity || 0,
        amount: item?.amount || 0,
        image: item?.products?.[0]?.images?.[0]?.url || "",
        price: item?.products?.[0]?.price || 0,
        offerPrice: item?.products?.[0]?.offerprice || 0,
        product: item?.products?.[0]?.id || null,
      })) || [];
    } catch (err) {
      console.log("fetchCartItems error", err);
      return [];
    }
  };

  const refreshCart = async () => {
    const items = await fetchCartItems();
    setCartItems(items);
  };

  const addToCart = async (data) => {
    if (typeof window === "undefined") return null;
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) return null;
    try {
      const res = await axios.post("/api/carts", data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      await refreshCart();
      return res;
    } catch (err) {
      console.log("addToCart error", err);
      return null;
    }
  };

  const removeFromCart = async (id) => {
    setLoadingItemId(id);
    if (!id || typeof window === "undefined") return;
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) return;

    try {
      await axios.delete(`/api/carts/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      await refreshCart();
      toast.success("Removed from Cart");
    } catch (err) {
      console.log("removeFromCart error", err);
    } finally {
      setLoadingItemId(null);
    }
  };

  const createOrder = async (payload) => {
    if (!payload || typeof window === "undefined") return null;
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) return null;

    try {
      const res = await axios.post("/api/orders", payload, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (res?.status >= 200 && res?.status < 300) {
        toast.success("Order placed successfully");
        for (const item of cartItems) await removeFromCart(item.id);
        setCartItems([]);
        router.replace("/my-orders");
        return res.data;
      }
    } catch (err) {
      toast.error("Error placing order");
      console.log("createOrder error", err);
    }
  };

  const getMyOrders = async () => {
    if (!user?.id || typeof window === "undefined") return [];
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) return [];

    try {
      const res = await axios.get(
        `/api/orders?filters[userid][$eq]=${user.id}&populate=orderedItems.product.images`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      return res?.data?.data || [];
    } catch (err) {
      console.log("getMyOrders error", err);
      return [];
    }
  };

  // Load user and data on mount
  useEffect(() => {
    getCategories();
    getProducts();
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) refreshCart();
    else setCartItems([]);
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        currency,
        user,
        setUser,
        categories,
        products,
        cartItems,
        setCartItems,
        loadingItemId,
        subTotal, setSubTotal,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        registerUser,
        loginUser,
        logout,
        addToCart,
        removeFromCart,
        refreshCart,
        createOrder,
        getMyOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
export const useAppContext = () => useContext(AppContext);