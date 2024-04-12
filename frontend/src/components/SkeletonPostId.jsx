import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import classes from './SkeletonPostId.module.css'

const SkeletonPostId = () => {
  return (
    <div className={classes.main}>
      <div className={classes.footer}>
        <Skeleton animation="wave" variant="rectangular" sx={{ bgcolor: 'grey.300', borderRadius: '7px' }} width={65} height={60} />
        <Skeleton animation="wave" variant="rectangular" sx={{ width: '100%', height: '60px', bgcolor: 'grey.300', }} />
      </div>
      <Stack sx={{ width: '100%', bgcolor: 'white', borderRadius: '0.6rem', gap: '0.3rem' }} spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton animation="wave" variant="rectangular" sx={{ height: '50vh', bgcolor: 'grey.300' }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="rectangule" sx={{ fontSize: '1rem', bgcolor: 'grey.300' }} />
        <Skeleton variant="rectangule" sx={{ fontSize: '1rem', bgcolor: 'grey.300' }} />
        <Skeleton variant="rectangule" sx={{ fontSize: '1rem', bgcolor: 'grey.300' }} />


      </Stack>

    </div>
  )
}

export default SkeletonPostId