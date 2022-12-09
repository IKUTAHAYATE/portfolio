import useItemData from "../../../hooks/useItemData";

export default function GetItem() {
    const {data, isError, isLoading} = useItemData()

	if (isError) {
		return (
			<div>Errorです</div>
		)
	}

    return (
        <div>
			<ul>
				{/* {data?.map((item, index) => {
					return(
						<li key={index}>{item.id}</li>
					)
				})} */}
				{
					isLoading ? 'Loading中...'
					: (data?.map(item => {
						return(
							<div key={item.id}>{item.id}</div>
						)
					}))
				}
			</ul>
        </div>
    )
}