const Form = () => {
  return (
	<>
		<form className="l-header__search" action="/" method="GET">
			<button type="submit"></button>
			<input type="text" placeholder="何かお探しですか？" name="freeword" />
		</form>
	</>
  )
}

export default Form