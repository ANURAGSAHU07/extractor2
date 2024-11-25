const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },  
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/csv') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and CSV files are allowed'));  // Updated error message
    }
  }
});

const PORT = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); 

function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType
    },
  };
}

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
};

app.post('/upload', upload.single('file'), async (req, res, next) => {
  let tempFilePath = null;

  try {
    const file = req.file;

    if (!file) {
      throw new Error('No file uploaded');
    }
 
    const filePart = fileToGenerativePart(file.buffer, file.mimetype);

    const prompt = `Strictly Follow this rule everytime:Parse the following PDF, CSV data and return ONLY a JSON object strictly following this structure, WITHOUT any additional text or explanations:
{
  "invoices": [
    {
      "serialNumber": "",
      "customerName": "",
      "productname": "",
      "quantity": 0,
      "tax": 0,
      "totalAmount": 0,
      "date": ""
    }
  ],
  "products": [
    {
      "name": "",
      "quantity": 0,
      "unitPrice": 0,
      "tax": 0,
      "priceWithTax": 0
    }
  ],
  "customers": [
    {
      "name": "",
      "phoneNumber": "",
      "totalPurchaseAmount": 0
    }
  ]
}`;

    const aiResponse = await model.generateContent([
      filePart,
      { text: prompt }
    ]);

    const response = await aiResponse.response;
    const aiText = response.text();
    console.log('AI Response Text:', aiText);

    let parsedData;
    try {
      const cleanedText = aiText.replace(/```json|```/g, '').trim();
      
      parsedData = JSON.parse(cleanedText);

    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Failed to parse AI response as JSON');
    }

    const validatedData = {
      invoices: Array.isArray(parsedData?.invoices) ? parsedData.invoices : [],
      products: Array.isArray(parsedData?.products) ? parsedData.products : [],
      customers: Array.isArray(parsedData?.customers) ? parsedData.customers : [],
    };

    res.json({
      success: true,
      data: validatedData,
    });

  } catch (error) {
    next(error);
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
