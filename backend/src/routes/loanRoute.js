const router = require("express").Router();
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
var stream = require('stream');
var Handlebars = require("handlebars");
const sourcePath = path.join(__dirname, "..", "views", "index.handlebars");
router.post("/loan", handleGetLoanTemplate);
router.post("/signature", handleAddSignature);
router.post('/docuDownload',handleDownloadDocument)
function handleGetLoanTemplate(req, res, next) {
  const currentLoan = req.body;
  try {
    const source = fs.readFileSync(sourcePath, "utf8");
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
    const browser = await puppeteer.launch({ defaultViewPort:false });
    const page = await browser.newPage();
    // await page.setViewport({
    //     width: 800,
    //     height: 600,
    //     deviceScaleFactor: 2,
    //   });
    //   await page.emulateMedia('screen');
    // await page.goto(sourcePath, { waitUntil: 'networkidle0' });
    // console.log(htmlContent)
    await page.setContent(htmlContent, {
      waitUntil: ["load", "networkidle0", "domcontentloaded"],
    });
    // await page.waitForSelector(".signatureImg");
    const pdfBuffer = await page.pdf({
      format: "A3",
      printBackground: true,
      outputPath: outputPath,
      margin: { top: "1cm", right: "1cm",bottom:'1cm', left: "1cm" },
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
    const source = fs.readFileSync(sourcePath, "utf8");
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
async function handleDownloadDocument(req,res,next){
  const currentLoan=req.body;
  console.log('here')
  try {
    const source = fs.readFileSync(sourcePath, "utf8");
    let template = Handlebars.compile(source);
    const result = template(currentLoan);
    generatePDFfromHTML(result, "loanAgreemnt.pdf")
    .then((pdfBuffer) => {
      // console.log(pdfBuffer);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="downloaded.pdf"');
      res.send(pdfBuffer);
      // const base64Data = pdfBuffer.toString("base64");
      // res.download(fileName,base64Data);
    })
    .catch((err) => console.error("Error generating PDF:", err));
  } catch (error) {
    console.log(error)
  }
}

module.exports = router;
