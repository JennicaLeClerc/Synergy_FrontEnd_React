import  './cssFile.css';

var updatePrice = () => {
	let amenity = '';
	let basePrice = 300.00;
	let totalPrice;
	switch (amenity){
		case 'TWIN_BED':
			totalPrice = basePrice + 80;
			break;
		case 'SOFA_BED':
			totalPrice = basePrice + 70;
			break;
		case 'QUEEN_BED':
			totalPrice = basePrice + 150
			break;
		case 'KING_BED':
			totalPrice = basePrice + 200;
			break;
		case 'SHOWER_BATH':
			totalPrice = basePrice + 75;
			break;
		case 'FULL_BATH':
			totalPrice = basePrice + 90;
			break;
		case 'SPA_BATH':
			totalPrice = basePrice + 115;
			break;
		case 'GOOD_VIEW':
			totalPrice = basePrice + 60;
			break;
		case 'FAIR_VIEW':
			totalPrice = basePrice + 40;
			break;
		case 'NO_VIEW':
			totalPrice = basePrice + 10;
			break;
		case 'FULL_KITCHEN':
			totalPrice = basePrice + 250;
			break;
		case 'SMALL_KITCHEN':
			totalPrice = basePrice + 175;
			break;
		case 'ADA':
			totalPrice = basePrice + 35;
	}

	return (
		<>
			<div>
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic" style={{marginRight: 100}}>
						Amenities
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item name = "Twin_Bed" onClick={(e)=> showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name = "display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "Sofa_Bed" onClick={(e)=> showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name = "display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name="Queen_Bed" onClick={(e)=> showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name = "display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "King_Bed" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name ="display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "Shower_Bath" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name ="display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "Full_Bath" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name ="display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "Spa_Bath" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name = "display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "Good_view" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name ="display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "Fair_View" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name = "display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "No_View" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name = "display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "Full_Kitchen" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name = "display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name = "Small_Kitchen" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name = "display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
						<Dropdown.Item name="ADA" onClick={(e) => showCurrent(e)}></Dropdown.Item>
						<input type = "text" size = "30" name = "display" id = "display"/>
						<input type = "button" id = "Update" value = "price" />
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</>	
	)
}

//<input id="myPrices" type="text" value="0">			// need to be decided where to put
function changePrice(e) {
	document.getElementById("myPrices").value = e.target.value
}
//export default										 // need to finish this line of code