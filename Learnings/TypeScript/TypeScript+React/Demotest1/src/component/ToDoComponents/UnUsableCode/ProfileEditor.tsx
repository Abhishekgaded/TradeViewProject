import { useState } from "react";

type Profile = {
  id: number,
  name: string,
  address: {
    city: string,
    pincode: number
  }
}
export default function ProfileEditor() {
  const [profile, setProfile] = useState<Profile>({
    id: 13,
    name: 'Sharanappa',
    address: {
      city: 'Bagalkot',
      pincode: 587111
    }
  })
  return (
    <>
      <div style={{ marginRight: 'auto', marginLeft: 'auto' }} >
        <div>

          <h2>Profile Editor</h2>
          <h3>Initial Details</h3>
          <p>User Name :{profile.name}</p>
          <p>User Id :{profile.id}</p>
          <p>User City :{profile.address.city}</p>
          <p>User City Pincode :{profile.address.pincode}</p>
        </div>
        <h2>Values Which can be changed</h2>
        <div>

          <label htmlFor="Name">Name:</label>
          <input type="text" value={profile.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfile(prev => prev ? { ...prev, name: e.target.value } : prev) }} />

        </div>
        <div>

          <label htmlFor="City">City:</label>
          <input type="text" value={profile.address.city} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProfile(prev => ({
              ...prev,
              address: { ...prev.address, city: e.target.value },
            }));
          }} />
        </div>
        <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); console.log(profile) }} />
      </div>


    </>
  );
}