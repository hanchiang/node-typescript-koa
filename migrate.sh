# Read arguments passed to the script.
if [ -z "$1" ]; then
 ENVIRONMENT='development'
else
 ENVIRONMENT="$1"
fi

echo ""
echo "Migrating for environment: $ENVIRONMENT"
echo ""

echo " -> Step 1: Compiling migration scripts."
echo ""
for filename in ./src/db/migrations/*.ts; do
 ./node_modules/.bin/tsc -t es2017 -module CommonJS -outDir ./build-migrations $filename
done
echo ""
echo " -> Compilation completed."
echo ""

echo ""
echo " -> Step 2: Starting migration."
echo ""
NODE_ENV=$1 ./node_modules/.bin/sequelize-cli db:migrate
echo ""
echo " -> Migration completed."
echo ""

echo ""
echo " -> Step 3: Deleting generated files."
echo ""
rm -Rf ./build-migrations
mkdir ./build-migrations
echo ""
echo " -> Deletion completed."