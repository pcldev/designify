import type { TFunction } from 'i18next'
import type { ComponentClass, FunctionComponent } from 'react'
import BlockLoading from '~/components/loading/BlockLoading'
import { useTranslation } from 'react-i18next'

export type WithTranslationProps = { t: TFunction; [key: string]: any }

export default function withTranslation(
  Component: FunctionComponent<WithTranslationProps> | ComponentClass<WithTranslationProps>
) {
  return function WithTranslation(props: any) {
    const { t, ready } = useTranslation()

    return ready || process.env.NODE_ENV === 'test' ? <Component {...props} t={t} /> : <BlockLoading />
  }
}
