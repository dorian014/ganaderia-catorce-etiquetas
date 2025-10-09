# 🥩 Generador de Etiquetas CATORCE

Aplicación web profesional para generar etiquetas de productos cárnicos imprimibles. Diseñado para imprimir 6 etiquetas por página A4 horizontal con toda la información esencial del producto.

## 🎯 Características

- **Etiquetas Listas para Imprimir**: Formato automático de 6 etiquetas por página A4 horizontal (3 columnas × 2 filas)
- **Actualizaciones en Tiempo Real**: Las etiquetas se actualizan instantáneamente mientras escribes
- **Diseño Profesional**: Cada etiqueta mide 9.4cm × 9.5cm para impresión óptima en A4 horizontal
- **Información Completa**: Incluye todos los detalles esenciales del producto cárnico
- **Fácil de Usar**: Interfaz de formulario simple con cálculos automáticos de fechas
- **Marca CATORCE**: Incluye el logo y branding de CATORCE

## 📋 Información de la Etiqueta

Cada etiqueta incluye:
- Nombre del producto
- Peso
- Fecha de empacado
- Código de barras
- Comedor de destino
- Fechas de caducidad para refrigeración y congelación
- Logo CATORCE

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Fill in the product information in the form
3. Labels update automatically as you type
4. Click "Print Labels" to print on A4 paper

## 🖨️ Printing Instructions

1. Use A4 paper (21cm × 29.7cm)
2. Set printer margins to "Default" or "Normal"
3. Ensure "Background graphics" is enabled for colored elements
4. Select "Portrait" orientation
5. The layout will automatically format to 6 labels per page

## 💡 Usage Tips

- **Dates**: Packed date defaults to today, use-by date to 7 days ahead
- **Price**: Include currency symbol (e.g., $12.99, €10.50)
- **Storage**: Default is "Keep refrigerated at 0-4°C"
- **Batch Code**: Use your internal tracking system (e.g., LOT#2024-001)
- **Clear Form**: Resets all fields to defaults

## 🛠️ Technical Details

- **Label Size**: Each label is 9.5cm × 9.5cm
- **Page Layout**: 2 columns × 3 rows = 6 labels per A4 page
- **Technologies**: HTML5, CSS3, Vanilla JavaScript
- **Print Optimization**: CSS print media queries for perfect output
- **Responsive**: Works on desktop and mobile devices

## 📁 File Structure

```
etiquetas/
├── index.html     # Main HTML structure with form and labels
├── styles.css     # Styling and print layout
├── script.js      # Dynamic label updates
└── README.md      # Documentation
```

## 🎨 Customization

### Changing Label Size
Edit the `.label` class in `styles.css`:
```css
.label {
    width: 9.5cm;   /* Adjust width */
    height: 9.5cm;  /* Adjust height */
}
```

### Modifying Default Values
Edit the default values in `script.js`:
```javascript
// Change default storage temperature
document.getElementById('storageInstructions').value = 'Keep frozen at -18°C';

// Change default expiry (e.g., 14 days)
useByDate.setDate(useByDate.getDate() + 14);
```

## 📝 Example Use Cases

Perfect for:
- Butcher shops
- Meat processing facilities
- Farmers' markets
- Grocery stores
- Home meat processing
- Meal prep businesses

## 🔧 Browser Compatibility

Works with modern browsers:
- Chrome (recommended for best printing)
- Firefox
- Safari
- Edge

## 📄 License

Free to use for personal and commercial purposes.

---

**Made with ❤️ for meat retailers and processors**