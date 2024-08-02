<script lang="tsx">
export default (props: { class: string }) => {
  let _class = props.class
  if (!_class.includes('w-'))
    _class += ' w-full'
  if (!_class.includes('rounded-'))
    _class += ' rounded-xl'
  return (
    <div color="default" class={_class} />
  )
}
</script>
