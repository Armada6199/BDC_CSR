const router = require("express").Router();
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
var Handlebars = require("handlebars");
const multer = require("multer");
const templateSourcePath = path.join(
  __dirname,
  "..",
  "views",
  "index.handlebars"
);
const upload = multer();
router.post("/loan", handleGetLoanTemplate);
router.post("/signature", handleAddSignature);
router.post("/docuDownload", handleDownloadDocument);
router.post(
  "/attatchments",
  upload.array('loan_attatchments'),
  handleCreateAttatchments  
);
function handleGetLoanTemplate(req, res, next) {
  const currentLoan = req.body;
  try {
    const source = fs.readFileSync(templateSourcePath, "utf8");
    let template = Handlebars.compile(source);
    const result = template(currentLoan);
    generatePDFfromHTML(result, "loanAgreemnt.pdf")
      .then((pdfBuffer) => {
        const base64Data = pdfBuffer.toString("base64");
        res.send(base64Data);
      })
      .catch((err) => console.error("Error generating PDF:", err));
  } catch (error) {
    next(error);
  }
}
async function generatePDFfromHTML(htmlContent, outputPath) {
  try {
    const browser = await puppeteer.launch({ defaultViewPort: false });
    const page = await browser.newPage();
    // await page.setViewport({
    //     width: 800,
    //     height: 600,
    //     deviceScaleFactor: 2,
    //   });
    //   await page.emulateMedia('screen');
    // await page.goto(templateSourcePath, { waitUntil: 'networkidle0' });
    // console.log(htmlContent)
    await page.setContent(htmlContent, {
      waitUntil: ["load", "networkidle0", "domcontentloaded"],
    });
    // await page.waitForSelector(".signatureImg");
    const pdfBuffer = await page.pdf({
      format: "A3",
      printBackground: true,
      outputPath: outputPath,
      margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
    });
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    throw new Error(error);
  }
}

async function handleAddSignature(req, res, next) {
  let currentLoan = req.body;
  try {
    const source = fs.readFileSync(templateSourcePath, "utf8");
    let template = Handlebars.compile(source);
    const result = template(currentLoan);
    // console.log(currentLoan.signatureBase64.s)
    //    currentLoan={ ...currentLoan,signatureBase64:currentLoan.signatureBase64.slice(22)};
    console.log(currentLoan.signatureBase64);
    generatePDFfromHTML(result, "loanAgreemnt.pdf")
      .then((pdfBuffer) => {
        // console.log(pdfBuffer)
        const base64Data = pdfBuffer.toString("base64");
        res.send(base64Data);
      })
      .catch((err) => console.error("Error generating PDF:", err));
  } catch (error) {
    console.log(error);
  }
}
async function handleDownloadDocument(req, res, next) {
  const currentLoan = req.body;
  console.log("here");
  try {
    const source = fs.readFileSync(templateSourcePath, "utf8");
    let template = Handlebars.compile(source);
    const result = template(currentLoan);
    generatePDFfromHTML(result, "loanAgreemnt.pdf")
      .then((pdfBuffer) => {
        // console.log(pdfBuffer);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="downloaded.pdf"'
        );
        res.send(pdfBuffer);
        // const base64Data = pdfBuffer.toString("base64");
        // res.download(fileName,base64Data);
      })
      .catch((err) => console.error("Error generating PDF:", err));
  } catch (error) {
    console.log(error);
  }
}
async function handleSaveAttatchments(employeeName, employeeNumber, file,fileNumber) {
  console.log(file)
  const fileName = `${employeeName.split(' ').join('_')+fileNumber}${file.originalname.slice(0,file.originalname.length-4)}.${file.originalname.slice(file.originalname.length-3)}`;
  const folderPath = `assets/${employeeName+employeeNumber}`;

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      fs.writeFile(`${folderPath}/${fileName}`, file.buffer, function (err) {
        if (err) throw err;
      });
    } else {
      fs.writeFile(`${folderPath}/${fileName}`, file.buffer, function (err) {
        if (err) throw err;
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}
async function handleCreateAttatchments(req, res, next) {
  const {employeeName,employeeNumber,fileNumber}=req.body;
  console.log(req.files)
  try {
    for (file of req.files) {
      await handleSaveAttatchments(employeeName,employeeNumber,file,fileNumber);
    }
    res.end();
  } catch (error) {
    next(error);
  }
}
module.exports = router;
