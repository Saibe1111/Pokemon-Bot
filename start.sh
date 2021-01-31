DATE=$(date +%d-%m-%Y-%Hh%Mm)

cd Mackogneur
pm2 delete mackogneur
mkdir logs
pm2 start index.js --name mackogneur -l logs/${DATE}.txt
cd ..

exit 0
