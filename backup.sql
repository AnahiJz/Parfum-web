/*M!999999\- enable the sandbox mode */ 
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `puntuacion` int(11) DEFAULT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_cal_user` (`usuario_id`),
  KEY `fk_cal_prod` (`producto_id`),
  CONSTRAINT `fk_cal_prod` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cal_user` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carrito_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 1 CHECK (`cantidad` > 0),
  PRIMARY KEY (`id`),
  UNIQUE KEY `carrito_id` (`carrito_id`,`producto_id`),
  KEY `fk_ci_prod` (`producto_id`),
  CONSTRAINT `fk_ci_cart` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ci_prod` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `carrito_items` VALUES
(5,2,3,1),
(6,2,2,1);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_cart_user` (`usuario_id`),
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `carritos` VALUES
(1,3,NULL,'2025-12-01 08:43:35','2025-12-01 08:43:35'),
(2,4,NULL,'2025-12-01 09:35:40','2025-12-01 09:35:40');
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `familias_olfativas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `familias_olfativas` VALUES
(9,'Acuático'),
(5,'Amaderado'),
(4,'Chipre'),
(1,'Cítrico'),
(7,'Cuero'),
(2,'Floral'),
(3,'Fougère'),
(10,'Frutal'),
(8,'Gourmand'),
(6,'Oriental');
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`,`producto_id`),
  KEY `fk_fav_prod` (`producto_id`),
  CONSTRAINT `fk_fav_prod` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `generos` VALUES
(1,'Hombre'),
(2,'Mujer'),
(3,'Unisex');
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `url_imagen` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_img_prod` (`producto_id`),
  CONSTRAINT `fk_img_prod` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `imagen_logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `marcas` VALUES
(1,'Dior',NULL),
(2,'Chanel',NULL),
(3,'Creed',NULL),
(4,'Montblanc',NULL),
(5,'Tom Ford',NULL),
(6,'Versace',NULL),
(7,'Gucci',NULL),
(8,'Hermès',NULL),
(9,'Amouage',NULL),
(10,'Paco Rabanne',NULL),
(11,'Azzaro',NULL),
(12,'Carolina Herrera',NULL),
(13,'Bvlgari',NULL),
(14,'Giorgio Armani',NULL),
(15,'Calvin Klein',NULL),
(16,'Lacoste',NULL),
(17,'Jean Paul Gaultier',NULL),
(18,'Le Labo',NULL),
(19,'Hugo Boss',NULL),
(20,'Yves Saint Laurent',NULL),
(21,'Prada',NULL),
(22,'Marc Jacobs',NULL),
(23,'Kenzo',NULL),
(24,'Givenchy',NULL),
(25,'Narciso Rodriguez',NULL),
(26,'Mancera',NULL),
(27,'Maison Francis Kurkdjian',NULL),
(28,'Lancôme',NULL),
(29,'Guerlain',NULL);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes_contacto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) DEFAULT NULL,
  `correo` varchar(120) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `mensaje` text NOT NULL,
  `leido` tinyint(1) DEFAULT 0,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mensaje` text NOT NULL,
  `tipo` enum('info','success','warning','error') DEFAULT 'info',
  `activo` tinyint(1) DEFAULT 1,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pedido_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `nombre_producto` varchar(150) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pd_order` (`pedido_id`),
  KEY `fk_pd_prod` (`producto_id`),
  CONSTRAINT `fk_pd_order` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pd_prod` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `pedido_detalle` VALUES
(1,1,2,'Bleu de Chanel',1,3299.00),
(2,1,3,'Aventus',1,4999.00),
(3,2,6,'Terre d\'Hermès',1,2899.00),
(4,2,7,'1 Million',1,2499.00),
(5,3,6,'Terre d\'Hermès',1,2899.00),
(6,3,7,'1 Million',1,2499.00),
(7,4,2,'Bleu de Chanel',1,3299.00),
(8,4,3,'Aventus',1,4999.00),
(9,5,6,'Terre d\'Hermès',1,2899.00),
(10,5,7,'1 Million',1,2499.00),
(11,6,7,'1 Million',1,2499.00),
(12,6,8,'Le Male',2,2499.00),
(13,7,7,'1 Million',1,2499.00),
(14,7,8,'Le Male',2,2499.00);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `costo_envio` decimal(10,2) DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','pagado','procesando','enviado','entregado','cancelado') DEFAULT 'pendiente',
  `direccion_envio` text NOT NULL,
  `telefono_contacto` varchar(20) DEFAULT NULL,
  `codigo_rastreo` varchar(100) DEFAULT NULL,
  `paqueteria` varchar(100) DEFAULT NULL,
  `metodo_pago` varchar(50) DEFAULT NULL,
  `id_transaccion_pago` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_order_user` (`usuario_id`),
  CONSTRAINT `fk_order_user` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `pedidos` VALUES
(1,3,8298.00,0.00,8298.00,'pagado','Dirección predeterminada del cliente',NULL,NULL,NULL,NULL,NULL,'2025-12-01 08:43:54'),
(2,3,5398.00,0.00,5398.00,'pendiente','Dirección por definir en pago',NULL,NULL,NULL,NULL,NULL,'2025-12-01 09:25:07'),
(3,3,5398.00,0.00,5398.00,'pendiente','Dirección por definir en pago',NULL,NULL,NULL,NULL,NULL,'2025-12-01 09:25:45'),
(4,4,8298.00,0.00,8298.00,'pendiente','Dirección por definir en pago',NULL,NULL,NULL,NULL,NULL,'2025-12-01 09:36:14'),
(5,3,5398.00,0.00,5398.00,'pagado','Dirección por definir en pago',NULL,NULL,NULL,NULL,NULL,'2025-12-01 11:22:24'),
(6,3,7497.00,0.00,7497.00,'pagado','Dirección por definir en pago',NULL,NULL,NULL,NULL,NULL,'2025-12-01 12:04:05'),
(7,3,7497.00,0.00,7497.00,'pendiente','Dirección por definir en pago',NULL,NULL,NULL,NULL,NULL,'2025-12-01 12:04:08');
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `marca_id` int(11) DEFAULT NULL,
  `genero_id` int(11) DEFAULT NULL,
  `tipo_id` int(11) DEFAULT NULL,
  `familia_id` int(11) DEFAULT NULL,
  `imagen_principal` varchar(255) DEFAULT NULL,
  `calificacion` decimal(3,1) DEFAULT 0.0,
  `es_popular` tinyint(1) DEFAULT 0,
  `destacado` tinyint(1) DEFAULT 0,
  `texto_insignia` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_prod_marca` (`marca_id`),
  KEY `fk_prod_genero` (`genero_id`),
  KEY `fk_prod_tipo` (`tipo_id`),
  KEY `fk_prod_familia` (`familia_id`),
  CONSTRAINT `fk_prod_familia` FOREIGN KEY (`familia_id`) REFERENCES `familias_olfativas` (`id`),
  CONSTRAINT `fk_prod_genero` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`),
  CONSTRAINT `fk_prod_marca` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`),
  CONSTRAINT `fk_prod_tipo` FOREIGN KEY (`tipo_id`) REFERENCES `tipos_perfume` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `productos` VALUES
(1,'Sauvage','Una composición rotundamente fresca, dictada por un nombre que suena como un manifiesto.',2499.00,50,1,1,1,3,'ParfumH/savage.jpg',4.9,1,1,'🔥 Best Seller','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(2,'Bleu de Chanel','Un elogio a la libertad que se expresa en un aromático amaderado de estela cautivadora.',3299.00,30,2,1,1,5,'ParfumH/bleu.jpg',5.0,1,1,'👑 Icónico','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(3,'Aventus','La excepcional fragancia Aventus fue inspirada por la dramática vida de un emperador histórico.',4999.00,10,3,1,2,4,'ParfumH/aventus.jpg',4.8,1,1,'💎 Premium','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(4,'Explorer','Montblanc Explorer invita a un viaje fantástico, una llamada irresistible a la aventura.',1899.00,40,4,1,1,5,'ParfumH/explorer.jpg',4.7,0,0,'⭐ Nuevo','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(5,'Eros','Amor, pasión, belleza y deseo: estos son los conceptos clave de la fragancia de hombres.',1999.00,60,6,1,1,3,'ParfumH/eros.jpg',4.6,1,0,'🎁 Oferta','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(6,'Terre d\'Hermès','La calidez y densidad de la madera combinada con la suavidad del benjuí.',2899.00,25,8,1,1,5,'ParfumH/terre.jpg',4.9,1,0,'👑 Clásico','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(7,'1 Million','El perfume del éxito. Ir a por el oro porque la decadencia es emocionante.',2499.00,100,10,1,1,6,'ParfumH/1million.jpg',4.9,1,0,NULL,'2025-11-27 22:24:55','2025-11-27 22:24:55'),
(8,'Le Male','Un homenaje a la figura simbólica que siempre ha inspirado a Jean Paul Gaultier: el marinero.',2499.00,45,17,1,1,3,'ParfumH/lemale.jpg',4.9,1,0,NULL,'2025-11-27 22:24:55','2025-11-27 22:24:55'),
(9,'Oud Wood','Madera de oud. Una de las materias primas más raras, preciosas y caras en el arsenal de un perfumista.',5500.00,8,5,3,2,5,'ParfumH/outwod.jpg',4.9,0,1,'💎 Nicho Top','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(10,'Santal 33','Una fragancia unisex que captura un espíritu definitorio del oeste americano.',4800.00,12,18,3,2,5,'ParfumH/santal33.jpg',4.9,1,1,'👑 Icónico','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(11,'Black Orchid','Una fragancia lujosa y sensual de acordes ricos y oscuros.',3899.00,15,5,2,2,6,'ParfumM/tomfordm.jpg',4.7,0,1,'✨ Exclusivo','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(12,'Guilty','Una declaración moderna de autoexpresión y valentía.',2199.00,35,7,2,1,2,'ParfumH/guilty.jpg',4.5,0,0,'⭐ Nuevo','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(13,'Myths Woman','Surrealismo narrado a través de notas florales y verdes.',7900.00,5,9,2,2,2,'ParfumN/myths.jpg',5.0,0,1,'💎 Ultra Lujo','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(14,'Bloom','Captura el espíritu de la mujer contemporánea, diversa y auténtica de Gucci.',2499.00,40,7,2,1,2,'ParfumM/bloom.jpg',4.9,1,0,NULL,'2025-11-27 22:24:55','2025-11-27 22:24:55'),
(15,'Coco Mademoiselle','La esencia de una mujer libre y audaz.',2899.00,55,2,2,1,6,'ParfumM/coco.jpg',5.0,1,1,'🔥 Best Seller','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(16,'La Vie Est Belle','Una declaración universal a la belleza de la vida.',2499.00,80,28,2,1,8,'ParfumP/belle.jpg',4.9,1,0,'🎁 Oferta','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(17,'Baccarat Rouge 540','Luminosa y sofisticada, una alquimia poética.',6500.00,5,27,3,2,6,'ParfumN/red.jpg',5.0,1,1,'🔥 Viral','2025-11-27 22:24:55','2025-11-27 22:24:55'),
(18,'Red Tobacco','Una fragancia cálida y fascinante con especias y tabaco.',2499.00,20,26,3,2,5,'ParfumN/mancera.jpg',4.8,0,1,'⭐ Nuevo','2025-11-27 22:24:55','2025-11-27 22:24:55');
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_perfume` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `tipos_perfume` VALUES
(4,'Celebrity'),
(1,'Designer'),
(3,'Indie'),
(2,'Niche');
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(120) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol` enum('usuario','admin') DEFAULT 'usuario',
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `usuarios` VALUES
(1,'Administrador','admin@parfum.com','12345','5512345678','admin','2025-11-27 22:24:54'),
(3,'Anahi Jiménez','djassojimenez@gmail.com','anahi0500',NULL,'usuario','2025-11-27 23:36:42'),
(4,'Jordy Adrián','jordydark@gmail.com','2703',NULL,'usuario','2025-12-01 09:35:34');
commit;
