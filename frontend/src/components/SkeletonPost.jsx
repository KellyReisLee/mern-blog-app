import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import classes from './SkeletonPost.module.css'


const SkeletonPost = () => {
  return (
    <div className={classes.main}>
      <Stack sx={{ width: '100%', bgcolor: 'white', padding: '2rem', borderRadius: '2rem' }} spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton animation="wave" variant="rectangular" sx={{ height: '20vh', bgcolor: 'grey.300' }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: 'grey.300' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: 'grey.300' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: 'grey.300' }} />

        <div className={classes.footer}>
          <Skeleton animation="wave" variant="circular" sx={{ bgcolor: 'grey.300' }} width={65} height={60} />
          <Skeleton animation="wave" variant="text" sx={{ width: '100%', bgcolor: 'grey.300' }} />
        </div>
      </Stack>

    </div>
  )
}

export default SkeletonPost