interface PresentationConfig {
  clientName: string;
  agencyName: string;
  agencyEmail: string;
  agencyPhone: string;
  priceDevelopment: number;
  priceHosting: number;
  deliveryDays: number;
  theme: 'dark' | 'light';
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

export async function createSalesPresentation(
  accessToken: string,
  config: PresentationConfig
): Promise<string> {
  const title = `Propuesta Premium - Landing Page de Ingeniería - ${config.clientName}`;

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
  // BRAND COLOR PALETTE & STYLES (VOLL BRAND)
  // ----------------------------------------------------
  // We've customized the palette to match the real corporate VOLL identity:
  const bgHex = '#0B0F19';       // Midnight Navy Deep background
  const textHex = '#FFFFFF';     // Crisp White for primary text
  const mutedHex = '#94A3B8';    // Sleek Slate Blue for body copy
  const vollBlueHex = '#171A8D'; // Official VOLL Deep Royal Blue
  const vollGoldHex = '#F7B51D'; // Official VOLL Bright Gold/Yellow
  const cardBgHex = '#111827';   // Card background

  const bgRgb = hexToRgb(bgHex);
  const textRgb = hexToRgb(textHex);
  const mutedRgb = hexToRgb(mutedHex);
  const vollBlueRgb = hexToRgb(vollBlueHex);
  const vollGoldRgb = hexToRgb(vollGoldHex);
  const cardBgRgb = hexToRgb(cardBgHex);

  // High-impact stable referential photos
  const imgTruckRoad = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600';
  const imgTruckFleet = 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=600';
  const imgLabTest = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600';

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

  // Helper to add an image directly to a slide
  const addImageRequest = (
    slideId: string,
    imageId: string,
    url: string,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    requests.push({
      createImage: {
        objectId: imageId,
        url: url,
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
  };

  // Helper to add VOLL branding elements in slide margins
  const addSlideHeader = (slideId: string, slideNum: string, sectionTitle: string) => {
    const prefix = `hdr_${slideId}`;
    
    // Header brand logo
    addTextBoxRequest(
      slideId,
      `${prefix}_brand_logo`,
      'VOLL',
      50,
      12,
      60,
      25,
      13,
      true,
      textRgb,
      'START',
      'Space Grotesk'
    );

    // Header tagline
    addTextBoxRequest(
      slideId,
      `${prefix}_brand_tagline`,
      '|   PROFESIONALES DE LA UREA AUTOMOTRIZ',
      98,
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

    // Slide Main Title (Y=46)
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

  // Helper to draw a mock browser framework with circles and search bar
  const drawMockBrowserFrame = (
    slideId: string,
    elementPrefix: string,
    x: number,
    y: number,
    w: number,
    h: number,
    urlText = 'voll.pe/analitica'
  ) => {
    // 1. Draw the browser outer card
    addCardRequest(slideId, `${elementPrefix}_browser_bg`, x, y, w, h, hexToRgb('#0E1321'), hexToRgb('#1F2937'));

    // 2. Draw mock header bar
    addCardRequest(slideId, `${elementPrefix}_browser_bar`, x + 1, y + 1, w - 2, 28, hexToRgb('#182235'), hexToRgb('#182235'));

    // 3. Dot signals representing close/minimize/maximize buttons
    addTextBoxRequest(
      slideId,
      `${elementPrefix}_browser_dots`,
      '● ● ●',
      x + 12,
      y + 7,
      50,
      15,
      8,
      false,
      vollGoldRgb,
      'START'
    );

    // 4. Mock search bar
    addCardRequest(slideId, `${elementPrefix}_browser_search`, x + 70, y + 5, w - 100, 18, hexToRgb('#0B0F19'), hexToRgb('#1F2937'));
    addTextBoxRequest(
      slideId,
      `${elementPrefix}_browser_search_text`,
      urlText,
      x + 80,
      y + 7,
      w - 120,
      15,
      8,
      false,
      mutedRgb,
      'START',
      'JetBrains Mono'
    );
  };

  // ----------------------------------------------------
  // SLIDE 1: COVER (Portada Comercial de Alto Impacto)
  // ----------------------------------------------------
  addBackgroundRequest(coverSlideId);
  
  // Left side copy
  addLineAccent(coverSlideId, 'cover_accent_line', 50, 75, 120, vollGoldRgb);

  addTextBoxRequest(
    coverSlideId,
    'cover_title_pre',
    'PROPUESTA DE INGENIERÍA DIGITAL & DESARROLLO WEB',
    50,
    90,
    340,
    25,
    10,
    true,
    vollGoldRgb,
    'START',
    'JetBrains Mono'
  );

  addTextBoxRequest(
    coverSlideId,
    'cover_title_main',
    'DISEÑO DE LANDING PAGE\nDE MÁXIMA CONVERSIÓN',
    50,
    115,
    340,
    80,
    24,
    true,
    textRgb,
    'START',
    'Space Grotesk'
  );

  addTextBoxRequest(
    coverSlideId,
    'cover_subtitle',
    'Optimizada para la venta industrial de Urea Automotriz, atracción de flotas de transporte y distribuidores en el Perú.',
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
  addLineAccent(coverSlideId, 'cover_footer_divider', 50, 275, 330, hexToRgb('#1F2937'));

  addTextBoxRequest(
    coverSlideId,
    'cover_footer_info',
    `PREPARADO PARA:  ${config.clientName.toUpperCase()}\nPROVEEDOR:      ${config.agencyName.toUpperCase()}\nCONTACTO:       ${config.agencyEmail}  |  ${config.agencyPhone}`,
    50,
    290,
    340,
    80,
    9,
    true,
    textRgb,
    'START',
    'JetBrains Mono'
  );

  // Right Side - Cinematic floating image of modern heavy duty transport truck
  // Gives immediate authority and relevance to the transport sector
  addCardRequest(coverSlideId, 'cover_image_frame', 400, 75, 270, 260, cardBgRgb, vollGoldRgb);
  addImageRequest(coverSlideId, 'cover_image', imgTruckRoad, 410, 85, 250, 240);

  // ----------------------------------------------------
  // SLIDE 2: EL DESAFÍO EN EL TRANSPORTE (Hook Slide)
  // ----------------------------------------------------
  const s2Id = 'slide_challenge';
  requests.push({
    createSlide: {
      objectId: s2Id,
      insertionIndex: 1,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s2Id);
  addSlideHeader(s2Id, '2', 'El Desafío en la Captación de Flotas Pesadas');

  // Left Column: The Problem
  addCardRequest(s2Id, 's2_col_left_card', 50, 100, 300, 250, cardBgRgb, hexToRgb('#EF4444'));
  addTextBoxRequest(s2Id, 's2_col_left_title', '❌  ¿Por qué fallan los sitios web estándar?', 70, 115, 260, 25, 13, true, hexToRgb('#F87171'), 'START', 'Space Grotesk');
  addTextBoxRequest(
    s2Id,
    's2_col_left_text',
    '• Poca Confianza de Ingeniería: Los gerentes de mantenimiento de flotas buscan certificaciones y fichas técnicas ISO 22241, no textos genéricos.\n\n• Carga Lenta en Rutas: El 85% de las consultas ocurren en smartphones bajo redes móviles inestables en carretera.\n\n• Sin Llamados a la Acción: Pérdida del 72% de clientes interesados al no tener canales directos e instantáneos de contacto.',
    70,
    150,
    260,
    180,
    10.5,
    false,
    mutedRgb,
    'START',
    'Inter'
  );

  // Right Column: The Opportunity & Image
  addCardRequest(s2Id, 's2_col_right_card', 370, 100, 300, 250, cardBgRgb, vollGoldRgb);
  addImageRequest(s2Id, 's2_image_fleet', imgTruckFleet, 385, 115, 270, 120);
  
  addTextBoxRequest(s2Id, 's2_col_right_title', '🎯  La Oportunidad VOLL', 385, 245, 270, 25, 13, true, vollGoldRgb, 'START', 'Space Grotesk');
  addTextBoxRequest(
    s2Id,
    's2_col_right_text',
    'Diseñaremos un embudo digital de alto impacto que demuestre la pureza química de su AdBlue, reduzca la fricción de cotización y acelere las ventas corporativas.',
    385,
    275,
    270,
    65,
    10,
    false,
    textRgb,
    'START',
    'Inter'
  );

  // ----------------------------------------------------
  // SLIDE 3: EXTRACTO DE LA LANDING - HERO & CONCEPTO VISUAL
  // ----------------------------------------------------
  const s3Id = 'slide_ext_hero';
  requests.push({
    createSlide: {
      objectId: s3Id,
      insertionIndex: 2,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s3Id);
  addSlideHeader(s3Id, '3', 'Primer Impacto Visual: Estética Tecnológica');

  // Left Column: Copy & Focus
  addTextBoxRequest(
    s3Id,
    's3_copy_title',
    'Sección 1: Hero Principal & Confianza OEM',
    50,
    100,
    290,
    25,
    13,
    true,
    vollGoldRgb,
    'START',
    'Space Grotesk'
  );

  addTextBoxRequest(
    s3Id,
    's3_copy_text',
    'La cabecera web utiliza un fondo cinemático de autopista nocturna y camiones pesados, posicionando el bidón premium VOLL 20L flotando en 3D.\n\n✔️  Mensaje Directo:\n"EL FUTURO DEL RENDIMIENTO DIÉSEL"\n\n✔️  Validación Inmediata:\nSellos interactivos ISO 22241, AUS32 y compatibilidad certificada con sistemas SCR Euro IV, V, VI.\n\n✔️  Bajas Tasas de Rebote:\nTiempos de respuesta inicial optimizados para celulares.',
    50,
    135,
    290,
    200,
    10.5,
    false,
    mutedRgb,
    'START',
    'Inter'
  );

  // Right Column: Browser Wireframe Preview of Hero fold
  drawMockBrowserFrame(s3Id, 's3_hero', 360, 100, 310, 250, 'voll.pe/inicio');
  
  // Custom mock webpage components inside browser frame (X: 360 to 670, Y: 100 to 350)
  // Web header logo
  addTextBoxRequest(s3Id, 's3_mock_logo', 'VOLL', 375, 135, 60, 20, 10, true, textRgb, 'START', 'Space Grotesk');
  addTextBoxRequest(s3Id, 's3_mock_tag', '• Pureza Certificada', 415, 137, 100, 15, 7, true, vollGoldRgb, 'START');
  addTextBoxRequest(s3Id, 's3_mock_nav', 'Especificaciones  •  Proceso  •  Cotizar', 510, 137, 150, 15, 7, false, mutedRgb, 'END');

  // Hero main text
  addTextBoxRequest(s3Id, 's3_mock_h1', 'EL FUTURO DEL\nRENDIMIENTO DIÉSEL', 375, 170, 150, 40, 12, true, textRgb, 'START', 'Space Grotesk');
  addTextBoxRequest(s3Id, 's3_mock_p', 'Urea Automotriz de máxima pureza bajo norma ISO 22241.', 375, 215, 150, 30, 8, false, mutedRgb, 'START');
  
  // Golden CTA button in mock web
  addCardRequest(s3Id, 's3_mock_cta', 375, 255, 100, 20, vollGoldRgb, vollGoldRgb);
  addTextBoxRequest(s3Id, 's3_mock_cta_text', 'SOLICITAR COTIZACIÓN', 375, 261, 100, 15, 7, true, hexToRgb('#000000'), 'CENTER', 'Space Grotesk');

  // Canister mockup illustration box
  addCardRequest(s3Id, 's3_mock_canister', 540, 170, 110, 140, hexToRgb('#182235'), vollGoldRgb);
  addTextBoxRequest(s3Id, 's3_mock_can_brand', 'VOLL 20L', 540, 190, 110, 20, 10, true, textRgb, 'CENTER', 'Space Grotesk');
  addTextBoxRequest(s3Id, 's3_mock_can_desc', 'Urea Automotriz\nISO 22241\nAUS32', 540, 215, 110, 50, 8, false, mutedRgb, 'CENTER');
  addCardRequest(s3Id, 's3_mock_can_badge', 580, 275, 30, 15, vollGoldRgb, vollGoldRgb);
  addTextBoxRequest(s3Id, 's3_mock_can_badge_txt', '32.5%', 580, 279, 30, 12, 7, true, hexToRgb('#000000'), 'CENTER', 'JetBrains Mono');

  // ----------------------------------------------------
  // SLIDE 4: EXTRACTO DE LA LANDING - CALCULADOR EUTÉCTICO
  // ----------------------------------------------------
  const s4Id = 'slide_ext_calc';
  requests.push({
    createSlide: {
      objectId: s4Id,
      insertionIndex: 3,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s4Id);
  addSlideHeader(s4Id, '4', 'Ficha Técnica & Calculadora Interactiva');

  // Left Column: Explanation of interactive value
  addTextBoxRequest(
    s4Id,
    's4_copy_title',
    'Sección 2: Simulador Físicofisiológico de Urea',
    50,
    100,
    290,
    25,
    13,
    true,
    vollGoldRgb,
    'START',
    'Space Grotesk'
  );

  addTextBoxRequest(
    s4Id,
    's4_copy_text',
    'La landing page incluye un simulador interactivo para educar al comprador y demostrar el rigor técnico de VOLL.\n\n💡  Funcionamiento Dinámico:\nEl cliente desliza la concentración (25% a 40%) y el sistema calcula automáticamente el Punto de Congelación y el Riesgo de Cristalización en los ductos.\n\n⭐  Posicionamiento de Autoridad:\nDestaca la perfección del punto de 32.5% (punto eutéctico) para asegurar un desempeño óptimo en alturas peruanas.',
    50,
    135,
    290,
    205,
    10.5,
    false,
    mutedRgb,
    'START',
    'Inter'
  );

  // Right Column: Simulator Wireframe Preview inside Browser
  drawMockBrowserFrame(s4Id, 's4_browser', 360, 100, 310, 250, 'voll.pe/analitica');

  // Wireframe UI
  addTextBoxRequest(s4Id, 's4_mock_title', 'Simulador de Concentración vs Congelación', 375, 135, 280, 20, 10, true, textRgb, 'START', 'Space Grotesk');
  
  // Slider graphic
  addTextBoxRequest(s4Id, 's4_mock_label', 'Concentración de Urea en Fluido:', 375, 160, 150, 15, 8, false, mutedRgb);
  addTextBoxRequest(s4Id, 's4_mock_value', '32.5 % [ Eutéctico ]', 525, 160, 130, 15, 8, true, vollGoldRgb, 'END', 'JetBrains Mono');
  
  // Slider Track and thumb
  addCardRequest(s4Id, 's4_mock_track', 375, 180, 280, 6, hexToRgb('#1F2937'), hexToRgb('#1F2937'));
  addCardRequest(s4Id, 's4_mock_thumb', 495, 175, 15, 15, vollGoldRgb, vollGoldRgb);

  // Output cards inside mock browser
  addCardRequest(s4Id, 's4_mock_card_left', 375, 205, 130, 60, hexToRgb('#182235'), hexToRgb('#10B981'));
  addTextBoxRequest(s4Id, 's4_mock_out1_lbl', 'Punto de Congelación', 385, 212, 110, 15, 8, false, mutedRgb);
  addTextBoxRequest(s4Id, 's4_mock_out1_val', '-11.5 °C', 385, 232, 110, 20, 14, true, hexToRgb('#10B981'), 'START', 'JetBrains Mono');

  addCardRequest(s4Id, 's4_mock_card_right', 525, 205, 130, 60, hexToRgb('#182235'), hexToRgb('#10B981'));
  addTextBoxRequest(s4Id, 's4_mock_out2_lbl', 'Riesgo Cristalización', 535, 212, 110, 15, 8, false, mutedRgb);
  addTextBoxRequest(s4Id, 's4_mock_out2_val', 'MÍNIMO', 535, 232, 110, 20, 13, true, hexToRgb('#10B981'), 'START', 'Space Grotesk');

  // Chemical Table micro-representation below cards
  addTextBoxRequest(
    s4Id,
    's4_mock_table_rep',
    '✓ ISO 12185 Densidad a 20°C: 1,090 kg/m³   |   ✓ ISO 22241 Biuret: <0.3%',
    375,
    280,
    280,
    30,
    8,
    false,
    mutedRgb,
    'START',
    'JetBrains Mono'
  );

  // ----------------------------------------------------
  // SLIDE 5: EXTRACTO DE LA LANDING - LABORATORIO & CALIDAD
  // ----------------------------------------------------
  const s5Id = 'slide_ext_quality';
  requests.push({
    createSlide: {
      objectId: s5Id,
      insertionIndex: 4,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s5Id);
  addSlideHeader(s5Id, '5', 'Garantía Técnica: Proceso de Calidad Local');

  // Left Column: Lab specs explanation
  addTextBoxRequest(
    s5Id,
    's5_copy_title',
    'Sección 3: Rigor Científico y Filtrado',
    50,
    100,
    290,
    25,
    13,
    true,
    vollGoldRgb,
    'START',
    'Space Grotesk'
  );

  addTextBoxRequest(
    s5Id,
    's5_copy_text',
    'La landing page aborda y despeja la principal duda técnica del comprador peruano: ¿Cómo se asegura la pureza del AdBlue local?\n\n🔬  Contenidos Incluidos:\n• Desionización de Agua: Por Osmosis Inversa multietapa para retirar iones nocivos de calcio, cobre y zinc.\n\n• Microfiltrado de 0.2 micras: Proceso previo al envasado para remover sedimentos sólidos insolubles.\n\n• Pruebas de Lote Local: Cada lote de Urea se valida por espectrofotometría e índice de refracción.',
    50,
    135,
    290,
    205,
    10,
    false,
    mutedRgb,
    'START',
    'Inter'
  );

  // Right Column: Professional Laboratory Photo + Quality badges
  addCardRequest(s5Id, 's5_photo_frame', 360, 100, 310, 250, cardBgRgb, vollGoldRgb);
  addImageRequest(s5Id, 's5_img_lab', imgLabTest, 375, 115, 280, 130);

  // Badges of Quality below image inside the card
  addCardRequest(s5Id, 's5_badge_1', 375, 260, 135, 75, hexToRgb('#0E1321'), hexToRgb('#1F2937'));
  addTextBoxRequest(s5Id, 's5_badge_1_title', '🧪  Fórmula Certificada', 385, 268, 115, 15, 9, true, vollGoldRgb, 'START', 'Space Grotesk');
  addTextBoxRequest(s5Id, 's5_badge_1_desc', 'Controles diarios de biuret, alcalinidad libre y trazas de metales bajo ISO 22241.', 385, 286, 115, 45, 8, false, mutedRgb, 'START', 'Inter');

  addCardRequest(s5Id, 's5_badge_2', 520, 260, 135, 75, hexToRgb('#0E1321'), hexToRgb('#1F2937'));
  addTextBoxRequest(s5Id, 's5_badge_2_title', '💧  Desmineralizado', 530, 268, 115, 15, 9, true, vollGoldRgb, 'START', 'Space Grotesk');
  addTextBoxRequest(s5Id, 's5_badge_2_desc', 'Agua de ultra-pureza con conductividad menor a 0.1 µS/cm para evitar incrustaciones.', 530, 286, 115, 45, 8, false, mutedRgb, 'START', 'Inter');

  // ----------------------------------------------------
  // SLIDE 6: WORK PROCESS (Cronograma Detallado)
  // ----------------------------------------------------
  const s6Id = 'slide_process';
  requests.push({
    createSlide: {
      objectId: s6Id,
      insertionIndex: 5,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s6Id);
  addSlideHeader(s6Id, '6', 'Fases y Cronograma de Desarrollo');

  const steps = [
    {
      num: '01',
      title: 'Estructuración',
      days: 'Días 1 - 3',
      desc: 'Definición de objetivos, estructura de secciones y recopilación de materiales (logotipos, imágenes, fichas técnicas).',
    },
    {
      num: '02',
      title: 'Diseño UX/UI',
      days: 'Días 4 - 7',
      desc: 'Boceto interactivo exclusivo en Figma bajo la paleta VOLL. Revisión y aprobación de la línea estética.',
    },
    {
      num: '03',
      title: 'Desarrollo',
      days: 'Días 8 - 12',
      desc: 'Maquetación responsive ultra-veloz, cálculo dinámico, optimización de velocidad de carga y SEO inicial.',
    },
    {
      num: '04',
      title: 'Lanzamiento',
      days: 'Días 13 - 14',
      desc: 'Indexación en Google, SSL activo, correos de negocio listos, capacitación de administración y entrega oficial.',
    },
  ];

  steps.forEach((step, idx) => {
    const colW = 145;
    const colX = 50 + idx * 160;
    const colY = 110;

    // Outer card for each step
    addCardRequest(s6Id, `s6_step_card_${idx}`, colX, colY, colW, 230, cardBgRgb, idx === 2 ? vollGoldRgb : hexToRgb('#1F2937'));

    // Number circle representation (TextBox)
    addTextBoxRequest(
      s6Id,
      `s6_step_num_${idx}`,
      step.num,
      colX + 15,
      colY + 15,
      40,
      25,
      16,
      true,
      vollGoldRgb,
      'START',
      'JetBrains Mono'
    );

    // Step Title
    addTextBoxRequest(
      s6Id,
      `s6_step_title_${idx}`,
      step.title,
      colX + 15,
      colY + 45,
      colW - 30,
      35,
      12,
      true,
      textRgb,
      'START',
      'Space Grotesk'
    );

    // Timeline days
    addTextBoxRequest(
      s6Id,
      `s6_step_days_${idx}`,
      step.days,
      colX + 15,
      colY + 80,
      colW - 30,
      20,
      10,
      true,
      vollGoldRgb,
      'START',
      'JetBrains Mono'
    );

    // Line accent separator
    addLineAccent(s6Id, `s6_step_line_${idx}`, colX + 15, colY + 105, 30, hexToRgb('#1F2937'));

    // Step description
    addTextBoxRequest(
      s6Id,
      `s6_step_desc_${idx}`,
      step.desc,
      colX + 15,
      colY + 115,
      colW - 30,
      100,
      9,
      false,
      mutedRgb,
      'START',
      'Inter'
    );
  });

  // ----------------------------------------------------
  // SLIDE 7: ALCANCE DE LA PROPUESTA (Everything Included)
  // ----------------------------------------------------
  const s7Id = 'slide_scope';
  requests.push({
    createSlide: {
      objectId: s7Id,
      insertionIndex: 6,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s7Id);
  addSlideHeader(s7Id, '7', 'Alcance del Servicio Integral Incluido');

  // Draw 2 columns of deliverables
  // Col 1
  addCardRequest(s7Id, 's7_card_col1', 50, 110, 300, 230, cardBgRgb, hexToRgb('#1F2937'));
  addTextBoxRequest(
    s7Id,
    's7_col1_text',
    '🌐  Dominio Propio Profesional (.com / .pe)\n• Registro a nombre de su empresa por 1 año.\n• Control absoluto de su propiedad digital.\n\n🔒  Hosting SSD NVMe Corporativo\n• Almacenamiento rápido con uptime de 99.9%.\n• Certificado SSL (HTTPS) de seguridad activa.\n\n📧  5 Cuentas de Correo Corporativo\n• Ej. ventas@tuempresa.com para mayor seriedad.\n• Configuración IMAP/POP para teléfonos.',
    70,
    130,
    260,
    190,
    10.5,
    false,
    textRgb,
    'START',
    'Inter'
  );

  // Col 2
  addCardRequest(s7Id, 's7_card_col2', 370, 110, 300, 230, cardBgRgb, vollGoldRgb);
  addTextBoxRequest(
    s7Id,
    's7_col2_text',
    '🚀  Optimización Técnica & Velocidad\n• Tiempos de carga optimizados menores a 2 seg.\n• Compresión de imágenes de transporte para rutas.\n\n📈  Rastreo Analítico Comercial\n• Instalación de Google Analytics & Meta Pixel.\n• Configuración de eventos al pulsar en WhatsApp.\n\n📱  Diseño UX Mobile-First\n• Adaptabilidad perfecta en cualquier smartphone.\n• Capacitación en el uso de credenciales.',
    390,
    130,
    260,
    190,
    10.5,
    false,
    textRgb,
    'START',
    'Inter'
  );

  // ----------------------------------------------------
  // SLIDE 8: INVERSIÓN COMERCIAL
  // ----------------------------------------------------
  const s8Id = 'slide_investment';
  requests.push({
    createSlide: {
      objectId: s8Id,
      insertionIndex: 7,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s8Id);
  addSlideHeader(s8Id, '8', 'Propuesta de Inversión Comercial');

  // Left Card: Landing Page Plan Pro
  addCardRequest(s8Id, 's8_card_left', 50, 100, 300, 240, cardBgRgb, vollGoldRgb);

  addTextBoxRequest(
    s8Id,
    's8_left_card_title',
    'Plan Landing Page Pro (Llave en Mano)',
    70,
    120,
    260,
    25,
    14,
    true,
    textRgb,
    'START',
    'Space Grotesk'
  );

  addTextBoxRequest(
    s8Id,
    's8_left_card_price',
    `S/. ${config.priceDevelopment} PEN`,
    70,
    145,
    260,
    35,
    24,
    true,
    vollGoldRgb,
    'START',
    'JetBrains Mono'
  );

  addLineAccent(s8Id, 's8_card_line', 70, 185, 50, vollGoldRgb);

  addTextBoxRequest(
    s8Id,
    's8_left_card_detail',
    `• Diseño UX/UI hecho a medida de su Urea.\n• Hosting SSD NVMe (1er año Incluido).\n• Dominio .com o .pe (1er año Incluido).\n• 5 Correos de negocio y Chat de WhatsApp.\n• Plazo de entrega oficial: ${config.deliveryDays} días hábiles.\n• Soporte técnico garantizado por 3 meses.`,
    70,
    195,
    260,
    130,
    10,
    false,
    textRgb,
    'START',
    'Inter'
  );

  // Right Side - Terms and conditions
  addTextBoxRequest(
    s8Id,
    's8_right_title',
    'Términos y Facilidades de Pago',
    380,
    105,
    290,
    25,
    13,
    true,
    vollGoldRgb,
    'START',
    'Space Grotesk'
  );

  addTextBoxRequest(
    s8Id,
    's8_right_text',
    `• Facilidad de Pago (50/50):\n   - 50% Adelanto al iniciar el desarrollo.\n   - 50% Saldo contra entrega oficial del sitio web.\n\n• Costo de Renovación Anual (Año 2 en adelante):\n  Únicamente S/. ${config.priceHosting} PEN al año para cubrir el dominio, hosting NVMe de alto rendimiento y las 5 cuentas de correo corporativo.\n\n💡  Retorno de Inversión Rápido:\nAl captar un solo cliente de flota mediana gracias al posicionamiento técnico de su página, usted habrá recuperado el 100% de la inversión digital.`,
    380,
    135,
    290,
    205,
    10.5,
    false,
    textRgb,
    'START',
    'Inter'
  );

  // ----------------------------------------------------
  // SLIDE 9: CALL TO ACTION / NEXT STEPS
  // ----------------------------------------------------
  const s9Id = 'slide_cta';
  requests.push({
    createSlide: {
      objectId: s9Id,
      insertionIndex: 8,
      slideLayoutReference: { predefinedLayout: 'BLANK' },
    },
  });
  addBackgroundRequest(s9Id);
  addSlideHeader(s9Id, '9', 'Siguientes Pasos para Iniciar');

  // Left column steps
  addTextBoxRequest(
    s9Id,
    's9_step_1',
    '1. Aceptación Formal\nConfirmación por escrito de la propuesta comercial para asegurar el espacio de su proyecto en nuestro cronograma.',
    50,
    110,
    290,
    55,
    10.5,
    false,
    textRgb,
    'START',
    'Inter'
  );

  addTextBoxRequest(
    s9Id,
    's9_step_2',
    '2. Depósito de Adelanto (50%)\nTransferencia interbancaria (BCP, BBVA, Interbank) para dar inicio formal al diseño e infraestructura de servidores.',
    50,
    170,
    290,
    55,
    10.5,
    false,
    textRgb,
    'START',
    'Inter'
  );

  addTextBoxRequest(
    s9Id,
    's9_step_3',
    '3. Reunión Inicial de Kick-off (15 min)\nLlamada breve para recolectar su logotipo, fotografías de la planta, y seleccionar sus colores corporativos primarios.',
    50,
    230,
    290,
    55,
    10.5,
    false,
    textRgb,
    'START',
    'Inter'
  );

  addTextBoxRequest(
    s9Id,
    's9_step_4',
    '4. Entrega del Primer Borrador Interactivo\nEn un plazo de 4 días hábiles, le enviaremos el enlace inicial privado para su revisión y comentarios.',
    50,
    290,
    290,
    55,
    10.5,
    false,
    textRgb,
    'START',
    'Inter'
  );

  // Right Side - Beautiful Contact Card
  addCardRequest(s9Id, 's9_contact_card', 370, 110, 300, 230, cardBgRgb, vollGoldRgb);

  addTextBoxRequest(
    s9Id,
    's9_card_title',
    '¡Hagamos despegar sus ventas de Urea!',
    390,
    130,
    260,
    25,
    14,
    true,
    textRgb,
    'START',
    'Space Grotesk'
  );

  addTextBoxRequest(
    s9Id,
    's9_card_contact',
    `Póngase en contacto hoy mismo para comenzar:\n\n👤  Representante:  ${config.agencyName}\n\n📧  Email:  ${config.agencyEmail}\n\n📱  WhatsApp:  ${config.agencyPhone}\n\n📍  Lima, Perú  |  Soporte Corporativo 24/7`,
    390,
    165,
    260,
    160,
    11,
    false,
    textRgb,
    'START',
    'Inter'
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
    throw new Error(`Error al aplicar las actualizaciones de las diapositivas: ${errText}`);
  }

  return presentationId;
}
