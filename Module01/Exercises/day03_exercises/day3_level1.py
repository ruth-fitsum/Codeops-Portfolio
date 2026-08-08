# 1,Lists & Tuples 

favCities=["New York","Kingston","Hawassa","Venice","Addis Ababa","Rio de Janeiro"]
print(f"{favCities[1]} and {favCities[-1]}" )

favCities.append("Bahirdar")
favCities.pop(1)
coordinates=(9.1450, 40.4897)
lat,lon=coordinates

# 2,Dictionaries

student={"name":"Abebe","age":27,"grade":"D","city":"Addis Ababa","department":"IT"}
print(f"{student['name']}, {student['department']} and  {student['grade']}")
student["phone"]="0987654321"
student["grade"]="B"

# 3, Sets

names=["Abebe","Kebede","Abebe","Abel","Beti","Beti"]
unique_names=set(names)
unique_names.add("Nati")
print(unique_names)