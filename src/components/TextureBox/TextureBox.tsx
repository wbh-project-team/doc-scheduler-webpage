import * as React from 'react'
import { Box } from '@mui/material'
import styles from './texturebox.module.css'

interface Props {
  children: React.ReactElement
  opacity?: number
}

export default function TextureBox({ children, opacity = 0.02 }: Props) {
  return (
    <Box component="div" className={styles['gradient-background']}>
      <Box className={styles['noise-background']} sx={{ opacity: opacity }} />
      {children}
    </Box>
  )
}
