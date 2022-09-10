import * as React from 'react'
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import { css, cx } from '@emotion/css'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion'
import Color from 'color'
export const PageContainer = ({ children, lottie }) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return !isLoading ? (
    <motion.div
      className={cx(styles.root, { [styles.isTablet]: isTablet, [styles.isMobile]: isMobile })}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}>
      <Grid
        container
        direction={'column'}
        flexWrap={'nowrap'}
        rowGap={5}
        paddingY={5}
        paddingX={isTablet ? 10 : isMobile ? 5 : 15}
        textAlign={'center'}
        className={styles.container}>
        {children}
      </Grid>
    </motion.div>
  ) : null
}

const useStyles = theme => ({
  root: css`
    display: grid;
    grid-template-columns: 1fr;
    min-height: 510px;
    max-width: 1200px;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    margin: 5% 0 5% 0;
  `,
  container: css`
    background-color: ${Color(theme.palette.background.default).lighten(1.5).hex()};
    border-radius: 24px;
  `,
  isTablet: css`
    > div {
      border-radius: unset;
    }
  `,
  isMobile: css`
    grid-template-columns: 1fr;
    min-width: 100vw;
    min-height: 100vh;
    max-width: unset;
    max-height: unset;
  `,
})
