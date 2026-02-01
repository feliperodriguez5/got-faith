import { getFirestore, collection, getDocs, getDoc, doc, query, where, addDoc } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

// Obtener todos los productos
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const products = [];
  querySnapshot.forEach((documento) => {
    products.push({
      id: documento.id,
      ...documento.data()
    });
  });
  return products;
};

// Obtener productos por categoría (usa WHERE)
export const getProductsByCategory = async (category) => {
  const q = query(collection(db, "items"), where("category", "==", category));
  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((documento) => {
    products.push({
      id: documento.id,
      ...documento.data()
    });
  });
  return products;
};

// Obtener un producto por ID (usa getDoc)
export const getProductById = async (productId) => {
  const docRef = doc(db, "items", productId);
  const docSnapshot = await getDoc(docRef);
  
  if (docSnapshot.exists()) {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    };
  } else {
    return null;
  }
};

// Crear una orden de compra
export const crearOrden = async (datosOrden) => {
  try {
    const docRef = await addDoc(collection(db, "ordenes"), {
      ...datosOrden,
      estado: "pendiente",
      fechaCreacion: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};