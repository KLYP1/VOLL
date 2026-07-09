interface VollPresentationConfig {
  clientName: string;
  agencyName: string;
  dateStr: string;
  setupPrice: number;
  esencialPrice: number;
  esencialHours: number;
  avanzadoPrice: number;
  avanzadoHours: number;
  newSectionPrice: number;
  integrationPrice: number;
  redesignPrice: number;
  redesignHourPrice: number;
  subpagePrice: number;
  supportBillingDays: number;
  primaryHex: string;
  accentHex: string;
}

// Convert Hex string (e.g. "#0F172A") to normalized RGB (0 to 1) for Google Slides API
function hexToRgb(hex: string): { red: number; green: number; blue: number } {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return {
    red: r / 255,
    green: g / 255,
    blue: b / 255,
  };
}

export async function createVollKlypPresentation(
  accessToken: string,
  config: VollPresentationConfig
): Promise<string> {
  const title = `Propuesta Comercial - Desarrollo y Soporte Landing - ${config.clientName}`;

  // 1. Create a blank presentation
  const createResponse = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!createResponse.ok) {
    const errText = await createResponse.text();
    throw new Error(`Error al crear la presentación: ${errText}`);
  }

  const presentation = await createResponse.json();
  const presentationId = presentation.presentationId;
  const coverSlideId = presentation.slides[0]?.objectId;

  if (!coverSlideId) {
    throw new Error('No se pudo obtener el ID de la primera diapositiva.');
  }

  // ----------------------------------------------------
  // BRAND COLOR PALETTE & STYLES (VOLL & KLYP PREMIUM DEEP NAVY / GOLD)
  // ----------------------------------------------------
  const bgHex = '#0B0F19';       // Midnight Navy Deep background
  const textHex = '#FFFFFF';     // Crisp White for primary text
  const mutedHex = '#94A3B8';    // Sleek Slate Blue for body copy
  const vollGoldHex = '#F7B51D'; // Official VOLL Bright Gold/Yellow
  const cardBgHex = '#111827';   // Card background

  const bgRgb = hexToRgb(bgHex);
  const textRgb = hexToRgb(textHex);
  const mutedRgb = hexToRgb(mutedHex);
  const vollGoldRgb = hexToRgb(vollGoldHex);
  const cardBgRgb = hexToRgb(cardBgHex);

  const requests: any[] = [];

  // Helper to add background color update
  const addBackgroundRequest = (slideId: string) => {
    requests.push({
      updatePageProperties: {
        objectId: slideId,
        pageProperties: {
          pageBackgroundFill: {
            solidFill: {
              color: {
                rgbColor: bgRgb,
              },
            },
          },
        },
        fields: 'pageBackgroundFill',
      },
    });
  };

  // Helper to create a textbox and format its text
  const addTextBoxRequest = (
    slideId: string,
    elementId: string,
    text: string,
    x: number,
    y: number,
    w: number,
    h: number,
    fontSize: number,
    isBold: boolean,
    colorRgb: { red: number; green: number; blue: number },
    alignment: 'START' | 'CENTER' | 'END' = 'START',
    fontFamily: string = 'Inter'
  ) => {
    // 1. Create Shape (TEXT_BOX)
    requests.push({
      createShape: {
        objectId: elementId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: w, unit: 'PT' },
            height: { magnitude: h, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: x,
            translateY: y,
            unit: 'PT',
          },
        },
      },
    });

    // 2. Insert Text
    requests.push({
      insertText: {
        objectId: elementId,
        text: text,
        insertionIndex: 0,
      },
    });

    // 3. Format Text Style
    requests.push({
      updateTextStyle: {
        objectId: elementId,
        style: {
          fontSize: { magnitude: fontSize, unit: 'PT' },
          fontFamily: fontFamily,
          foregroundColor: {
            opaqueColor: {
              rgbColor: colorRgb,
            },
          },
          bold: isBold,
        },
        textRange: {
          type: 'ALL',
        },
        fields: 'fontSize,fontFamily,foregroundColor,bold',
      },
    });

    // 4. Format Paragraph Style (Alignment)
    requests.push({
      updateParagraphStyle: {
        objectId: elementId,
        style: {
          alignment: alignment,
          lineSpacing: 115,
        },
        textRange: {
          type: 'ALL',
        },
        fields: 'alignment,lineSpacing',
      },
    });
  };

  // Helper to draw a horizontal rule / accent line
  const addLineAccent = (slideId: string, elementId: string, x: number, y: number, w: number, colorRgb = vollGoldRgb) => {
    requests.push({
      createShape: {
        objectId: elementId,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: w, unit: 'PT' },
            height: { magnitude: 2, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: x,
            translateY: y,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      updateShapeProperties: {
        objectId: elementId,
        shapeProperties: {
          shapeBackgroundFill: {
            solidFill: {
              color: {
                rgbColor: colorRgb,
              },
            },
          },
          outline: {
            outlineFill: {
              solidFill: {
                color: {
                  rgbColor: colorRgb,
                },
              },
            },
          },
        },
        fields: 'shapeBackgroundFill,outline',
      },
    });
  };

  // Helper to create a card container
  const addCardRequest = (
    slideId: string,
    cardId: string,
    x: number,
    y: number,
    w: number,
    h: number,
    bgColorRgb = cardBgRgb,
    borderColorRgb = vollGoldRgb
  ) => {
    requests.push({
      createShape: {
        objectId: cardId,
        shapeType: 'ROUND_RECTANGLE',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: w, unit: 'PT' },
            height: { magnitude: h, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: x,
            translateY: y,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      updateShapeProperties: {
        objectId: cardId,
        shapeProperties: {
          shapeBackgroundFill: {
            solidFill: {
              color: {
                rgbColor: bgColorRgb,
              },
            },
          },
          outline: {
            outlineFill: {
              solidFill: {
                color: {
                  rgbColor: borderColorRgb,
                },
              },
            },
            weight: { magnitude: 1.5, unit: 'PT' },
          },
        },
        fields: 'shapeBackgroundFill,outline',
      },
    });
  };

  // Helper to add VOLL & KLYP branding elements in slide margins
  const addSlideHeader = (slideId: string, slideNum: string, sectionTitle: string) => {
    const prefix = `hdr_${slideId}`;
    
    // Header brand logo
    addTextBoxRequest(
      slideId,
      `${prefix}_brand_logo`,
      'VOLL  x  KLYP',
      50,
      12,
      120,
      25,
      11,
      true,
      textRgb,
      'START',
      'Space Grotesk'
    );

    // Header tagline
    addTextBoxRequest(
      slideId,
      `${prefix}_brand_tagline`,
      '|   PROPUESTA DE DESARROLLO Y SOPORTE WEB',
      155,
      14,
      300,
      20,
      8,
      true,
      vollGoldRgb,
      'START',
      'Inter'
    );

    // Slide category index
    addTextBoxRequest(
      slideId,
      `${prefix}_cat_idx`,
      `[ 0${slideNum} ]`,
      620,
      14,
      50,
      20,
      9,
      true,
      vollGoldRgb,
      'END',
      'JetBrains Mono'
    );

    // Divider line
    addLineAccent(slideId, `${prefix}_divider`, 50, 36, 620, hexToRgb('#1F2937'));

    // Slide Main Title
    addTextBoxRequest(
      slideId,
      `${prefix}_main_title`,
      sectionTitle.toUpperCase(),
      50,
      46,
      620,
      30,
      14,
      true,
      textRgb,
      'START',
      'Space Grotesk'
    );
  };

  // ----------------------------------------------------
  // SLIDE 1: COVER (Portada Corporativa Premium)
  // ----------------------------------------------------
  addBackgroundRequest(coverSlideId);
  
  // Left side copy
  addLineAccent(coverSlideId, 'cover_accent_line', 50, 75, 120, vollGoldRgb);

  addTextBoxRequest(
    coverSlideId,
    'cover_title_pre',
    'PROPUESTA COMERCIAL CORPORATIVA',
    50,
    90,
    340,
    25,
    11,
    true,
    vollGoldRgb,
    'START',
    'JetBrains Mono'
  );

  addTextBoxRequest(
    coverSlideId,
    'cover_title_main',
    'DESARROLLO, SETUP Y\nSOPORTE DE LANDING PAGE',
    50,
    115,
    440,
    80,
    23,
    true,
    textRgb,
    'START',
    'Space Grotesk'
  );

  addTextBoxRequest(
    coverSlideId,
    'cover_subtitle',
    'Ingeniería digital optimizada, alta velocidad de carga y soporte premium adaptado para la consolidación de la marca VOLL.',
    50,
    205,
    330,
    60,
    11,
    false,
    mutedRgb,
    'START',
    'Inter'
  );

  // Divider above footer details
  addLineAccent(coverSlideId, 'cover_footer_divider', 50, 275, 620, hexToRgb('#1F2937'));

  addTextBoxRequest(
    coverSlideId,
    'cover_footer_info_left',
    `PREPARADO PARA:\nCLIENTE:\nFECHA:`,
    50,
    290,
    150,
    60,
    9,
    true,
    vollGoldRgb,
    'START',
    'JetBrains Mono'
  );

  addTextBoxRequest(
    coverSlideId,
    'cover_footer_info_right',
    `${config.clientName.toUpperCase()}\n${config.agencyName.toUpperCase()} (KLYP)\n${config.dateStr.toUpperCase()}`,
    170,
    290,
    300,
    60,
    9,
    true,
    textRgb,
    'START',
    'JetBrains Mono'
  );

  // Decorative right graphic
  addCardRequest(coverSlideId, 'cover_decor_frame', 480, 85, 190, 170, cardBgRgb, vollGoldRgb);
  addTextBoxRequest(coverSlideId, 'cover_decor_text1', 'LANDING', 480, 115, 190, 25, 16, true, textRgb, 'CENTER', 'Space Grotesk');
  addTextBoxRequest(coverSlideId, 'cover_decor_text2', 'OPTIMIZADA', 480, 140, 190, 25, 11, true, vollGoldRgb, 'CENTER', 'JetBrains Mono');
  addLineAccent(coverSlideId, 'cover_decor_line', 545, 175, 60, vollGoldRgb);
  addTextBoxRequest(coverSlideId, 'cover_decor_text3', 'SOPORTE 24/7', 480, 190, 190, 25, 9, false, mutedRgb, 'CENTER', 'Inter');

  // ----------------------------------------------------
  // SLIDE 2: 1. RESUMEN EJECUTIVO
  // ----------------------------------------------------
  const s2Id = 'slide_summary';
  requests.push({
    createSlide: {
      objectId: s2Id,
      insertionIndex: 1,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s2Id);
  addSlideHeader(s2Id, '2', '1. Resumen Ejecutivo');

  addCardRequest(s2Id, 's2_main_card', 50, 100, 620, 230, cardBgRgb, hexToRgb('#1F2937'));
  
  // Highlighted decorative quote symbol
  addTextBoxRequest(
    s2Id,
    's2_quote_symbol',
    '“',
    75,
    115,
    100,
    60,
    48,
    true,
    vollGoldRgb,
    'START',
    'Space Grotesk'
  );

  addTextBoxRequest(
    s2Id,
    's2_body_text',
    'El objetivo de esta propuesta es presentar los costos de implementación, optimización y soporte técnico para la nueva landing page de VOLL.\n\nDado que la empresa ya cuenta con un dominio propio, la inversión se enfocará exclusivamente en el despliegue técnico (Setup) y en asegurar la continuidad, velocidad y actualización de la página mediante un esquema de soporte mensual adaptado a sus necesidades.',
    120,
    130,
    510,
    170,
    12,
    false,
    textRgb,
    'START',
    'Inter'
  );

  // ----------------------------------------------------
  // SLIDE 3: 2. ALCANCE DEL SETUP TÉCNICO (Pago Único)
  // ----------------------------------------------------
  const s3Id = 'slide_setup';
  requests.push({
    createSlide: {
      objectId: s3Id,
      insertionIndex: 2,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s3Id);
  addSlideHeader(s3Id, '3', '2. Alcance del Setup Técnico');

  addTextBoxRequest(
    s3Id,
    's3_pre_text',
    'Este concepto cubre la puesta en marcha inicial de la landing page utilizando el dominio actual de VOLL:',
    50,
    95,
    620,
    25,
    11,
    false,
    mutedRgb,
    'START',
    'Inter'
  );

  const setupItems = [
    {
      title: 'Configuración y Despliegue',
      desc: 'Vinculación del dominio existente con el servidor de hosting estable.',
    },
    {
      title: 'Optimización de Carga',
      desc: 'Compresión de imágenes, código limpio y caché para cargar en menos de 3 segundos.',
    },
    {
      title: 'Diseño Responsive',
      desc: 'Adaptación perfecta para dispositivos móviles, tablets y computadoras.',
    },
    {
      title: 'SEO Básico e Indexación',
      desc: 'Configuración de meta titles, descripciones y alta en Google Search Console.',
    },
    {
      title: 'Integración de Formularios',
      desc: 'Conexión de WhatsApp y formularios de correo directo al equipo de VOLL.',
    },
  ];

  setupItems.forEach((item, idx) => {
    const cardY = 130 + idx * 42;
    addCardRequest(s3Id, `s3_item_card_${idx}`, 50, cardY, 390, 36, cardBgRgb, hexToRgb('#1F2937'));
    
    // Check icon
    addTextBoxRequest(s3Id, `s3_item_chk_${idx}`, '✔', 65, cardY + 8, 25, 20, 11, true, vollGoldRgb, 'START', 'Inter');
    
    // Item text
    addTextBoxRequest(
      s3Id,
      `s3_item_title_${idx}`,
      `|  ${item.title}: `,
      85,
      cardY + 8,
      170,
      20,
      9.5,
      true,
      textRgb,
      'START',
      'Inter'
    );
    addTextBoxRequest(
      s3Id,
      `s3_item_desc_${idx}`,
      item.desc,
      255,
      cardY + 8,
      180,
      20,
      9,
      false,
      mutedRgb,
      'START',
      'Inter'
    );
  });

  // Right Side - Pricing Block
  addCardRequest(s3Id, 's3_price_card', 460, 130, 210, 204, cardBgRgb, vollGoldRgb);
  addTextBoxRequest(s3Id, 's3_price_lbl', 'INVERSIÓN SETUP', 460, 160, 210, 20, 10, true, mutedRgb, 'CENTER', 'JetBrains Mono');
  addTextBoxRequest(s3Id, 's3_price_val', `S/. ${config.setupPrice} PEN`, 460, 185, 210, 35, 20, true, vollGoldRgb, 'CENTER', 'JetBrains Mono');
  addTextBoxRequest(s3Id, 's3_price_term', 'Pago Único Inicial', 460, 225, 210, 20, 9.5, true, textRgb, 'CENTER', 'Inter');
  addLineAccent(s3Id, 's3_price_line', 525, 255, 80, vollGoldRgb);

  // ----------------------------------------------------
  // SLIDE 4: 3. SOPORTE Y MANTENIMIENTO MENSUAL
  // ----------------------------------------------------
  const s4Id = 'slide_support_plans';
  requests.push({
    createSlide: {
      objectId: s4Id,
      insertionIndex: 3,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s4Id);
  addSlideHeader(s4Id, '4', '3. Soporte y Mantenimiento Mensual');

  // Left Plan: Esencial
  addCardRequest(s4Id, 's4_card_esencial', 50, 95, 300, 245, cardBgRgb, hexToRgb('#1F2937'));
  addTextBoxRequest(s4Id, 's4_esencial_title', 'OPCIÓN 1: PLAN SOPORTE ESENCIAL', 70, 110, 260, 25, 11, true, textRgb, 'START', 'Space Grotesk');
  addTextBoxRequest(s4Id, 's4_esencial_use', '(Ideal para mantenimiento y ajustes menores)', 70, 130, 260, 20, 9, false, mutedRgb, 'START', 'Inter');
  
  addTextBoxRequest(
    s4Id,
    's4_esencial_bullets',
    `• Garantía de Disponibilidad: Monitoreo 24/7.\n• SSL y Seguridad: Renovación HTTPS y anti-malware.\n• Respaldos Automáticos: Copias de seguridad mensuales.\n• Ajustes Incluidos (Hasta ${config.esencialHours} horas/mes):\n   - Cambios de texto menores (precios, ortografía).\n   - Sustitución de imágenes o banners existentes.\n   - Ajustes ligeros en el diseño de bloques ya construidos.`,
    70,
    155,
    260,
    130,
    8.5,
    false,
    mutedRgb,
    'START',
    'Inter'
  );
  
  addLineAccent(s4Id, 's4_esencial_line', 70, 290, 50, hexToRgb('#1F2937'));
  addTextBoxRequest(s4Id, 's4_esencial_price', `S/. ${config.esencialPrice} / mes`, 70, 300, 260, 25, 14, true, vollGoldRgb, 'START', 'JetBrains Mono');

  // Right Plan: Avanzado
  addCardRequest(s4Id, 's4_card_avanzado', 370, 95, 300, 245, cardBgRgb, vollGoldRgb);
  addTextBoxRequest(s4Id, 's4_avanzado_title', 'OPCIÓN 2: PLAN SOPORTE AVANZADO', 390, 110, 260, 25, 11, true, textRgb, 'START', 'Space Grotesk');
  addTextBoxRequest(s4Id, 's4_avanzado_use', '(Ideal para optimizaciones y actualizaciones continuas)', 390, 130, 260, 20, 9, false, mutedRgb, 'START', 'Inter');

  addTextBoxRequest(
    s4Id,
    's4_avanzado_bullets',
    `✔ INCLUYE TODO LO DEL PLAN ESENCIAL, MÁS:\n\n🚀 Horas Adicionales de Diseño / Desarrollo:\n• Hasta ${config.avanzadoHours} horas de diseño/desarrollo al mes para cambios estructurales de complejidad media.\n• Ejemplos incluidos:\n   - Agregar una nueva sección corta.\n   - Cambiar la estructura de un formulario.\n   - Crear variantes de secciones para campañas de Ads.`,
    390,
    155,
    260,
    130,
    8.5,
    false,
    textRgb,
    'START',
    'Inter'
  );

  addLineAccent(s4Id, 's4_avanzado_line', 390, 290, 50, vollGoldRgb);
  addTextBoxRequest(s4Id, 's4_avanzado_price', `S/. ${config.avanzadoPrice} / mes`, 390, 300, 260, 25, 14, true, vollGoldRgb, 'START', 'JetBrains Mono');

  // ----------------------------------------------------
  // SLIDE 5: 4. TABLA DE TARIFAS (Cambios Estructurados)
  // ----------------------------------------------------
  const s5Id = 'slide_rates';
  requests.push({
    createSlide: {
      objectId: s5Id,
      insertionIndex: 4,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s5Id);
  addSlideHeader(s5Id, '5', '4. Tarifas para Cambios Estructurados');

  addTextBoxRequest(
    s5Id,
    's5_intro',
    'Si VOLL requiere modificaciones profundas que transformen la estructura original de la landing y excedan las horas del plan, se cotizarán bajo la siguiente tarifa:',
    50,
    95,
    620,
    25,
    10,
    false,
    mutedRgb,
    'START',
    'Inter'
  );

  // Table Container Box
  addCardRequest(s5Id, 's5_table_box', 50, 125, 620, 210, cardBgRgb, hexToRgb('#1F2937'));

  // Header row
  addCardRequest(s5Id, 's5_th_bg', 51, 126, 618, 28, hexToRgb('#182235'), hexToRgb('#182235'));
  addTextBoxRequest(s5Id, 's5_th1', 'TIPO DE CAMBIO ESTRUCTURADO', 65, 133, 200, 20, 9, true, textRgb, 'START', 'Space Grotesk');
  addTextBoxRequest(s5Id, 's5_th2', 'DESCRIPCIÓN DEL SERVICIO', 255, 133, 250, 20, 9, true, textRgb, 'START', 'Space Grotesk');
  addTextBoxRequest(s5Id, 's5_th3', 'COSTO ESTIMADO', 535, 133, 115, 20, 9, true, vollGoldRgb, 'END', 'Space Grotesk');

  const rows = [
    {
      title: 'Creación de Nueva Sección Completa',
      desc: 'Diseño y desarrollo de un bloque nuevo (ej: testimonios, nueva línea).',
      price: `S/. ${config.newSectionPrice} PEN`,
    },
    {
      title: 'Integración de Herramientas de Terceros',
      desc: 'Conexión con CRMs (HubSpot, Salesforce), pasarelas de pago o Email Marketing.',
      price: `S/. ${config.integrationPrice} PEN`,
    },
    {
      title: 'Rediseño Estructural Mayor',
      desc: 'Cambio total del layout, paleta de colores o reestructuración del flujo.',
      price: `S/. ${config.redesignPrice} / Sec  |  S/. ${config.redesignHourPrice} Hr`,
    },
    {
      title: 'Desarrollo de Subpágina Adicional',
      desc: 'Extensión de la landing a un sitio multi-página (ej: términos o página de gracias).',
      price: `S/. ${config.subpagePrice} PEN`,
    },
  ];

  rows.forEach((row, idx) => {
    const rowY = 158 + idx * 42;
    // Optional zebra background or subtle thin line at the bottom
    if (idx < rows.length - 1) {
      addLineAccent(s5Id, `s5_td_line_${idx}`, 60, rowY + 38, 600, hexToRgb('#1F2937'));
    }

    addTextBoxRequest(s5Id, `s5_td1_${idx}`, row.title, 65, rowY + 6, 180, 32, 9, true, textRgb, 'START', 'Inter');
    addTextBoxRequest(s5Id, `s5_td2_${idx}`, row.desc, 255, rowY + 6, 260, 32, 8.5, false, mutedRgb, 'START', 'Inter');
    addTextBoxRequest(s5Id, `s5_td3_${idx}`, row.price, 525, rowY + 10, 125, 20, 9, true, vollGoldRgb, 'END', 'JetBrains Mono');
  });

  // ----------------------------------------------------
  // SLIDE 6: 5. TÉRMINOS Y CONDICIONES GENERALES
  // ----------------------------------------------------
  const s6Id = 'slide_terms';
  requests.push({
    createSlide: {
      objectId: s6Id,
      insertionIndex: 5,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s6Id);
  addSlideHeader(s6Id, '6', '5. Términos y Condiciones Generales');

  const terms = [
    {
      title: 'Vigencia de la propuesta',
      desc: '30 días calendario a partir de la fecha de emisión del documento.',
    },
    {
      title: 'Condiciones de Pago del Setup',
      desc: '50% de anticipo para iniciar la configuración y 50% contra entrega final y publicación oficial.',
    },
    {
      title: 'Facturación del Soporte',
      desc: `El pago mensual del plan seleccionado se realiza por adelantado dentro de los primeros ${config.supportBillingDays} días de cada mes.`,
    },
    {
      title: 'Propiedad Intelectual',
      desc: 'Una vez liquidado el Setup técnico, el código, el diseño y todos los accesos de la landing page pertenecen 100% a VOLL.',
    },
  ];

  terms.forEach((term, idx) => {
    const colX = 50 + (idx % 2) * 320;
    const colY = 110 + Math.floor(idx / 2) * 115;

    addCardRequest(s6Id, `s6_term_card_${idx}`, colX, colY, 300, 95, cardBgRgb, hexToRgb('#1F2937'));
    addTextBoxRequest(
      s6Id,
      `s6_term_title_${idx}`,
      `📌  ${term.title}`,
      colX + 15,
      colY + 12,
      270,
      20,
      10,
      true,
      vollGoldRgb,
      'START',
      'Space Grotesk'
    );
    addTextBoxRequest(
      s6Id,
      `s6_term_desc_${idx}`,
      term.desc,
      colX + 15,
      colY + 35,
      270,
      50,
      9,
      false,
      mutedRgb,
      'START',
      'Inter'
    );
  });

  // Small final footer text inside slide 6
  addTextBoxRequest(
    s6Id,
    's6_final_sig',
    'PROPUESTA DE DESARROLLO E INGENIERÍA DIGITAL  •  KLYP COOPERATIVA  •  JULIO 2026',
    50,
    332,
    620,
    20,
    8,
    true,
    hexToRgb('#4B5563'),
    'CENTER',
    'JetBrains Mono'
  );

  // Send batch update
  const updateResponse = await fetch(
    `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ requests }),
    }
  );

  if (!updateResponse.ok) {
    const errText = await updateResponse.text();
    throw new Error(`Error al aplicar las actualizaciones de las diapositivas de VOLL x KLYP: ${errText}`);
  }

  return presentationId;
}
