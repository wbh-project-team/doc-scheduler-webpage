import { SvgIconProps, SvgIconTypeMap } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { Url } from 'url'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface Links {
  name: string
  link: string
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}

export const links_left: Links[] = [
  { name: 'FAQs', link: '/FAQs', icon: QuestionAnswerIcon }
]

export const links_right: Links[] = [
  { name: 'Datenschutz', link: '/Datenschutz' },
  { name: 'AGBs', link: '/AGBs' },
  { name: 'Impressum', link: '/Impressum' }
]
