module.export=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../../public/styles.css" />
  </head>
 <style>
body{
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    background-color: #f6f6f6;
   
}
.main_container{
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100vh;
    overflow: scroll;
}
.inner_container{
    width: 90%;
    margin: auto;
}

.heading_subInformation{
    display: flex;
    align-items: center;
    width: 25%;
    justify-content: space-between;
}
table{
    width: 100%;
    padding: 16px;
    border-collapse: collapse;
    background: rgba( 255, 255, 255, 0.9 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 11.5px );
-webkit-backdrop-filter: blur( 11.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
}
table th{
    padding: 1em;
}
table .layer_title{
    text-align: left;
    font-weight: bold;
    color: #b0a080;
    font-size: 17px;
}
table tr td {
    padding: 1em;
    border: 1px solid lightgray;
    
}
</style>
  <body>
    <section class="main_container">
      <div class="inner_container">
        <div>
          <h1 style="text-align: center">Personal Loan Agreement</h1>
        </div>
        <div>
          <p>
            This loan agreement is made and will be
            <bold>effective on 1 December 2023</bold>
          </p>
          <h4>Between</h4>
          <p>{{currentLoan.employeeName}}</p>
          <h4>And</h4>
          <p>BDC BANK</p>
        </div>
        <div>
          <h5>Terms and conditions :</h5>
          <p>
            Withing 300 months from today ,Borrower promises to pay the Lender
            40700 Jordanian Dinars and interst as well as other charges agreed
            on.
          </p>
        </div>
        <div>
          <h5>Loan Details</h5>
        </div>
        <table
          aria-label="simple table"
        >
          <thead >
            <tr
            >
              <th
                scope="col"
              >
                Loan Status
              </th>
              <th
                scope="col"
              >
                Loan Type
              </th>
              <th
                scope="col"
              >
                Applied Amount
              </th>
              <th
                scope="col"
              >
                Applied Interest
              </th>
              <th
                scope="col"
                rowspan="2"
              >
                Layer Interest Rate
              </th>
              <th
                scope="col"
              >
                Range
              </th>
              <th
                scope="col"
              >
                Previous Loans Deductions
              </th>
            </tr>
          </thead>
          <thead >
            <tr
            class="layer_title"
            >
              <th
                scope="col"
                colspan="12"
              >
                First Layer
              </th>
            </tr>
          </thead>
          <tbody >
            <tr >
              <td
                
              >
                Requested
              </td>
              <td
                
                rowspan="2"
              >
                Home Loan
              </td>
              <td
                
              >
                38000
              </td>
              <td
                
                rowspan="2"
              >
                28405
              </td>
              <td
                
                rowspan="2"
              >
                3.25 %
              </td>
              <td
                
                rowspan="2"
              >
                5000 - 38000
              </td>
              <td
                
                rowspan="2"
              >
                2000
              </td>
            </tr>
            <tr >
              <td
                
              >
                Active
              </td>
              <td
                
              >
                2000
              </td>
            </tr>
          </tbody>
          <thead >
            <tr
              
            >
              <th
              class="layer_title"
                scope="col"
                colspan="12"
              >
                Second Layer
              </th>
            </tr>
          </thead>
          <tbody >
            <tr >
              <td
                
              >
                Requested
              </td>
              <td
                
                rowspan="2"
              >
                Home Loan
              </td>
              <td
                
              >
                160000
              </td>
              <td
                
                rowspan="2"
              >
                147200
              </td>
              <td
                
                rowspan="2"
              >
                4 %
              </td>
              <td
                
                rowspan="2"
              >
                5000 - 160000
              </td>
              <td
                rowspan="2"
              >
                2000
              </td>
            </tr>
          </tbody>
          <thead >
            <tr
            >
              <th
                scope="col"
                colspan="12"
                class="layer_title"

              >
                Third Layer
              </th>
            </tr>
          </thead>
          <tbody >
            <tr >
              <td
                
              >
                Requested
              </td>
              <td
                
                rowspan="2"
              >
                Home Loan
              </td>
              <td
                
              >
                15000
              </td>
              <td
                rowspan="2"
              >
                20700
              </td>
              <td
                rowspan="2"
              >
                6 %
              </td>
              <td
                rowspan="2"
              >
                5000 - 15000
              </td>
              <td
                rowspan="2"
              >
                2000
              </td>
            </tr>
          </tbody>
          <thead >
            <tr
            >
              <th
                scope="col"
                colspan="12"
                class="layer_title"

              >
                Forth Layer
              </th>
            </tr>
          </thead>
          <tbody >
            <tr >
              <td
              >
                Requested
              </td>
              <td
                rowspan="2"
              >
                Home Loan
              </td>
              <td
              >
                134000
              </td>
              <td
                rowspan="2"
              >
                323610
              </td>
              <td
                rowspan="2"
              >
                10.5 %
              </td>
              <td
                rowspan="2"
              >
                5000 - 190000
              </td>
              <td
                rowspan="2"
              >
                2000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </body>
</html>
`