import React from 'react'
import classes from './SkeletonAuthors.module.css'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonAuthors = () => {
  return (
    <Stack sx={{ width: '100%', bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }} spacing={1}>
      <div className={classes.main}>
        <Skeleton animation="wave" variant="circular" width={65} height={60} />
        <div className={classes.text}>
          <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
          <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
        </div>
      </div>
    </Stack>

  )
}

export default SkeletonAuthors
