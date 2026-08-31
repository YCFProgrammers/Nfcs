/* =================================================================
   DATOS DE LA TARJETA
   Este es el único archivo que cambias por cada cliente.
   Copia la carpeta completa, edita solo esto.
================================================================= */

const CARD = {

  // Si quieres proteger la tarjeta con contraseña, escríbela aquí.
  // Si no quieres contraseña, deja: null
  // Nota: es una cortina simple (client-side), no seguridad real.
  password: null, // ej: "cliente2024"

  name: "Yojan",
  role: "Desarrollador · Proyectos a medida",

  // URL de imagen, o deja "" para mostrar iniciales automáticas
  avatar: "",

  links: [
    {
      type: "whatsapp",
      label: "WhatsApp",
      // número con código de país, sin espacios ni +
      phone: "573001234567",
      message: "Hola Yojan, vi tu tarjeta y quiero más info"
    },
    {
      type: "instagram",
      label: "Instagram",
      handle: "@yojan.dev",
      url: "https://instagram.com/yojan.dev"
    },
    {
      type: "catalog",
      label: "Catálogo",
      sub: "Ver productos y precios",
      url: "https://ejemplo.com/catalogo"
    },
    {
      type: "payment",
      label: "Métodos de pago",
      methods: [
        { name: "Nequi", value: "300 123 4567" },
        { name: "Daviplata", value: "300 123 4567" },
        { name: "Bancolombia", value: "Ahorros 000-000000-00" }
      ]
    },
    {
      type: "location",
      label: "Ubicación",
      sub: "Pereira, Risaralda",
      url: "https://maps.app.goo.gl/ejemplo"
    },
    {
      type: "reviews",
      label: "Reseñas",
      sub: "Ver opiniones de clientes",
      url: "https://ejemplo.com/reseñas"
    }
  ],

  footerText: "Tarjeta digital · hecha por ti"
};
