import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import classes from './SkeletonPost.module.css'


const SkeletonPost = () => {
  return (
    <div >
      <Stack sx={{ width: '100%' }} spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="rectangular" sx={{ height: '20vh' }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

        <div className={classes.footer}>
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton variant="text" sx={{ width: '100%' }} />
        </div>
      </Stack>

    </div>
  )
}

export default SkeletonPost