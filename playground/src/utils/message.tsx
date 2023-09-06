import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { VNodeChild } from 'vue/dist/vue'
import { MessageOptions } from 'naive-ui/es/message/src/types'

let message: MessageApiInjection

export const MessageRegister = defineComponent({
  setup() {
    message = useMessage()
    return () => <div></div>
  },
})

type ContentType = string | (() => VNodeChild)
interface ShowMessageProps extends MessageOptions {
  content: ContentType
}
const defaultProps: ShowMessageProps = {
  type: 'success',
  content: '',
}
export function showMessage(props: ShowMessageProps) {
  const { content, ...msgProps } = { ...defaultProps, ...(props || {}) }
  return message.create(content, msgProps)
}
