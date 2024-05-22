const asyncHandler = require("../middleware/asyncHandler");

exports.updatePendingOrders = asyncHandler(async () => {
    const fiveDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));
    const updated = await Order.updateMany({
        date: { $lte: fiveDaysAgo },
        status: 'Pending'
    }, {
        status: 'Complete'
    });
    console.log(`${updated.nModified} захиалгууд амжилттай хүргэгдсэн байна.'.`);

}
);