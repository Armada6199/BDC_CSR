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
  upload.array("loan_attatchments"),
  handleCreateAttatchments
);
router.delete("/attatchments/:name", hanldeDeleteFile);
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
async function handleSaveAttatchments(
  employeeName,
  employeeNumber,
  file,
  fileNumber
) {
  const fileName = `${
    employeeName.split(" ").join("_") + fileNumber
  }${file.originalname.slice(
    0,
    file.originalname.length - 4
  )}.${file.originalname.slice(file.originalname.length - 3)}`;
  const folderPath = `assets/${employeeName.split(" ").join("_") + employeeNumber}`;

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      fs.writeFile(`${folderPath}/${fileName}`, file.buffer, function (err) {
        if (err) throw err;
      });
      return { msg: `File ${file.originalname} Uploaded Successfully` };
    } else {
      if (fs.existsSync(`${folderPath}/${fileName}`)) {
        return {
          msg: `File ${file.originalname} Already exists in memory`,
          err: "Already Exists",
        };
      }
      fs.writeFile(`${folderPath}/${fileName}`, file.buffer, function (err) {
        if (err) throw err;
      });
      return { msg: `File ${file.originalname} Uploaded Successfully` };
    }
  } catch (error) {
    throw new Error(error);
  }
}
async function handleCreateAttatchments(req, res, next) {
  const { employeeName, employeeNumber, fileNumber } = req.body;
  const statusObj = { errs: [] };
  try {
    for (file of req.files) {
      const { msg, err } = await handleSaveAttatchments(
        employeeName,
        employeeNumber,
        file,
        fileNumber
      );
      if (err) {
        const errorObj = { [file.originalname]: file.originalname, msg: err };
        statusObj.errs = [...statusObj.errs, errorObj];
      } else statusObj[file.originalname] = msg;
    }
    res.status(200).send(statusObj);
  } catch (error) {
    next(error);
  }
}
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath, function (err) {
      if (err) throw new Error(err);
      console.log("file deleted successfully");
    });
    return `File ${filePath} has been deleted.`
  } catch (err) {
    throw new Error(err);
  }
}
async function hanldeDeleteFile(req, res, next) {
  const fileName = req.params.name;
  //// no session or jwt token  to store and pressist login data
  const employeeName = "mohamad_abdin";
  const employeeNumber = 1111;
  const fileNumber=22;
  try {
    const folderPath = `assets/${employeeName + employeeNumber}`;
    if (fs.existsSync(`${folderPath}/${fileName}`)) {
      next("file doesnt exists");
    }
   const deleteStat= await deleteFile(folderPath +'/'+ (employeeName+fileNumber+fileName));
    res.status(200).send({deleteStat});
  } catch (error) {
    next(error);
  }
}

module.exports = router;
