MONGO_URI=$1
SCRIPT=$2

mongo --eval "var uri='$MONGO_URI';" $SCRIPT