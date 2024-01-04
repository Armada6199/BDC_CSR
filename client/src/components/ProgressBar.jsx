import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress,{linearProgressClasses } from '@mui/material/LinearProgress';
import styled from '@emotion/styled';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.secondary.dark,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor:  theme.palette.primary.bluish,
    },
  }));
export default function ProgressBar({progress}) {
  const [buffer, setBuffer] = React.useState(10);
  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setBuffer(progress + diff + diff2);
    };
  });
  return (
    <Box sx={{ width: '100%' }}>
      <BorderLinearProgress sx={{backgroundColor:"secondary.dark"}} variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
}
