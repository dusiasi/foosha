import Item from '../components/Item';
import './ItemList.css';
import { useMainContext } from '../components/Context';
import { useEffect } from 'react';
import { calculateDistance } from '../services/utils';
import Map from '../components/Map';



function ItemList () {

  const { user, list, setList, location } = useMainContext();

  // once there's a location, we can sort the items by distance between item's location and user
  useEffect(() => {
    if (location) {
      const sortedItemsLocation = list.sort((a, b) => {
       let distanceA = calculateDistance(a.location.lat, a.location.lng, location.lat, location.lng);
       let distanceB = calculateDistance(b.location.lat, b.location.lng, location.lat, location.lng);
       return distanceA - distanceB;
     });
     const filteredOpenItems = sortedItemsLocation.filter(elem => elem.available); // delete this
     setList(sortedItemsLocation);
   }
  },[] );

//////////////////////////////////////////////////////////
  return (
    <>
      <h2>List</h2>
      <div id="item-map" >
        <Map mapAsInput={false} zoom={10}></Map>
      </div>

      <div id="item-list-container" >
        {/* we don't show our own items here */}
        {
          (!list.filter(elem => elem.owner !== user._id).length) ? <p>Nothing on offer 🥦🥦🥦</p> : list.map(elem =>
            elem.owner !== user._id ? <Item key={elem._id} item={elem} ></Item> : null)
          }
      </div>
    </>
  )
}


export default ItemList;