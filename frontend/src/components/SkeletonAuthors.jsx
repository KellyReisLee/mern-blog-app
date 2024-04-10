import React from 'react'
import classes from './SkeletonAuthors.module.css'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonAuthors = () => {
  return (
    <Stack sx={{ width: '100%' }} spacing={1}>
      <div className={classes.main}>
        <Skeleton variant="circular" width={65} height={60} />
        <div className={classes.text}>
          <Skeleton variant="text" sx={{ width: '100%' }} />
          <Skeleton variant="text" sx={{ width: '100%' }} />
        </div>
      </div>
    </Stack>

  )
}

export default SkeletonAuthors
