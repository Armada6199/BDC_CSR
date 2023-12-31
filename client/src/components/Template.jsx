import { useCallback, useEffect, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import { Grid, Typography } from '@mui/material';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const resizeObserverOptions = {};
const maxWidth = '800';
export default function Template({pdfString}) {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });
  console.log(pdfString)
  // const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  // function onDocumentLoadSuccess({ numPages: nextNumPages }) {
  //   setNumPages(nextNumPages);
  // }
  return (
    <Grid ref={setContainerRef} zIndex={'0'}  border={'2px solid lightgray'} borderRadius={'5px'} item md={12} justifyContent={'center'}>
          <Document  file={`data:application/pdf;base64,${pdfString}`}  >
              <Page
                pageNumber={ 1}
                width={ containerWidth?containerWidth:maxWidth}
              />
          </Document>
          
    </Grid>
  );
}