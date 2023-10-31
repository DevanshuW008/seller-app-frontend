import { PRODUCT_CATEGORY } from "../../../utils/constants";

const productFields = [
  {
    id: "productCode",
    title: "Product Code",
    placeholder: "Product Code",
    type: "input",
    required: true,
    class: 'md:col-span-3 col-span-6'
  },
  {
    id: "productName",
    title: "Product Name",
    placeholder: "Product Name",
    type: "input",
    required: true,
    class: 'col-span-6 md:col-span-3',
    hasMicIcon: true,
  },
  {
    id: "MRP",
    title: "MRP",
    placeholder: "MRP",
    type: "number",
    required: true,
    valueInDecimal: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "retailPrice",
    title: "Retail Price",
    placeholder: "Retail Price",
    type: "number",
    required: true,
    valueInDecimal: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "purchasePrice",
    title: "Purchase Price",
    placeholder: "Purchase Price",
    type: "number",
    required: true,
    valueInDecimal: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "HSNCode",
    title: "HSN Code",
    placeholder: "HSN Code",
    type: "input",
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "GST_Percentage",
    title: "GST Percentage",
    placeholder: "Please Select GST Percentage",
    type: "select",
    options: [
      { key: "0", value: 0 },
      { key: "5", value: 5 },
      { key: "12", value: 12 },
      { key: "18", value: 18 },
      { key: "28", value: 28 },
    ],
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "productCategory",
    title: "Product Category",
    placeholder: "Please Select Product Category",
    options: Object.entries(PRODUCT_CATEGORY).map(([key, value]) => {
      return { key: value, value: key };
    }),
    type: "select",
    disableClearable: true,
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "productSubcategory1",
    title: "Product SubCategory",
    placeholder: "Please Select Product SubCategory",
    options: [],
    type: "select",
    disableClearable: true,
    required: true,
    class: 'md:col-span-2 col-span-6'
  },

  {
    id: "manufacturerOrPackerName",
    title: "Manufacturer Or Packer Name",
    placeholder: "Manufacturer Or Packer Name",
    type: "input",
    required: true,
    class: 'md:col-span-4 col-span-6'
  },
  {
    id: "manufacturerOrPackerAddress",
    title: "Manufacturer Or Packer Address",
    placeholder: "Manufacturer Or Packer Address",
    type: "input",
    required: true,
    class: 'md:col-span-3 col-span-6'
  },
  {
    id: "commonOrGenericNameOfCommodity",
    title: "Common Or Generic Name Of Commodity",
    placeholder: "Common Or Generic Name Of Commodity",
    type: "input",
    required: true,
    class: 'col-span-6 md:col-span-3'
  },
  {
    id: "monthYearOfManufacturePackingImport",
    title: "Month Year Of Manufacture Packing Import",
    placeholder: "Month YearOf Manufacture Packing Import",
    type: "date-picker",
    required: true,
    format: "MM/YYYY",
    views: ["year", "month"],
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "importerFSSAILicenseNo",
    title: "Importer FSSAI License No",
    placeholder: "Importer FSSAI License No",
    type: "number",
    maxLength: 14,
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "brandOwnerFSSAILicenseNo",
    title: "Brand Owner FSSAI License No",
    placeholder: "Brand Owner FSSAI License No",
    type: "number",
    maxLength: 14,
    required: true,
    class: 'md:col-span-2 col-span-6'
  },

  {
    id: "quantity",
    title: "Quantity",
    placeholder: "Quantity",
    type: "number",
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "barcode",
    title: "Barcode",
    placeholder: "Barcode",
    type: "number",
    maxLength: 12,
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "maxAllowedQty",
    title: "Max Allowed Quantity",
    placeholder: "Max Allowed Quantity",
    type: "number",
    required: true,
    min: 1,
    maxLength: 10,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "UOM",
    title: "UOM",
    placeholder: "UOM",
    type: "input",
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "packQty",
    title: "Measurement Quantity",
    placeholder: "Measurement Quantity",
    type: "input",
    required: true,
    class: 'md:col-span-2 col-span-6',
    hasMicIcon: true,
  },
  {
    id: "length",
    title: "Length",
    placeholder: "Length",
    type: "input",
    maxLength: 6,
    required: true,
    class: 'md:col-span-2 col-span-6',
    hasMicIcon: true,
  },
  {
    id: "breadth",
    title: "Breadth",
    placeholder: "Breadth",
    type: "input",
    maxLength: 6,
    required: true,
    class: 'md:col-span-2 col-span-6',
    hasMicIcon: true,
  },
  {
    id: "height",
    title: "Height",
    placeholder: "Height",
    type: "input",
    maxLength: 6,
    required: true,
    class: 'md:col-span-2 col-span-6',
    hasMicIcon: true,
  },
  {
    id: "weight",
    title: "Weight",
    placeholder: "Weight",
    type: "input",
    maxLength: 3,
    required: true,
    class: 'md:col-span-2 col-span-6',
    hasMicIcon: true,
  },
  {
    id: "returnWindow",
    title: "Return Window (in hours)",
    placeholder: "Return Window (in hours)",
    type: "number",
    maxLength: 3,
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "manufacturerName",
    title: "Manufacturer Name",
    placeholder: "Manufacturer Name",
    type: "input",
    maxLength: 50,
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "manufacturedDate",
    title: "Manufactured Date",
    placeholder: "Manufactured Date",
    type: "date-picker",
    required: true,
    class: 'md:col-span-2 col-span-6'
  },
  {
    id: "nutritionalInfo",
    title: "Nutritional Info",
    placeholder: "Nutritional Info",
    type: "input",
    required: true,
    class: 'md:col-span-3 col-span-6'
  },
  {
    id: "additiveInfo",
    title: "Additive Info",
    placeholder: "Additive Info",
    type: "input",
    required: true,
    class: 'md:col-span-3 col-span-6'

  },
  {
    id: "instructions",
    title: "Instructions",
    placeholder: "Instructions",
    type: "input",
    required: true,
    class: 'col-span-6'
  },
  {
    id: "longDescription",
    title: "Long Description",
    placeholder: "Long Description",
    type: "input",
    required: true,
    multiline: true,
    class: 'col-span-6',
    hasMicIcon: true,
  },
  {
    id: "description",
    title: "Short Description",
    placeholder: "Short Description",
    type: "input",
    required: true,
    multiline: true,
    class: 'col-span-6',
    hasMicIcon: true,
  },
  {
    id: "isCancellable",
    title: "Cancellable",
    type: "radio",
    options: [
      { key: "Yes", value: "true" },
      { key: "No", value: "false" },
    ],
    required: true,
    class: 'md:col-span-1 col-span-6'
  },
  {
    id: "isReturnable",
    title: "Returnable",
    type: "radio",
    options: [
      { key: "Yes", value: "true" },
      { key: "No", value: "false" },
    ],
    required: true,
    class: 'md:col-span-1 col-span-6'
  },
  {
    id: "isVegetarian",
    title: "Vegetarian",
    type: "radio",
    options: [
      { key: "Yes", value: "true" },
      { key: "No", value: "false" },
    ],
    required: true,
    class: 'md:col-span-1 col-span-6'
  },
  {
    id: "availableOnCod",
    title: "Available On Cash On Delivery",
    type: "radio",
    options: [
      { key: "Yes", value: "true" },
      { key: "No", value: "false" },
    ],
    required: true,
    class: 'md:col-span-1 col-span-6'
  },
  {
    id: "images",
    title:
      "Images",
    type: "upload",
    multiple: true,
    file_type: "product_image",
    required: true,
    class: 'col-span-6'
  },
];

export default productFields;
