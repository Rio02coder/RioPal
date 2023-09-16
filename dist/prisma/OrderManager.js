"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
/**
 * This class is an implementation of the OrderDatabase.
 * This implements all the DB operations on an order.
 */
class OrderManager {
    /**
     * Method to add an id less order to the db.
     * @param order The id less order passed
     * @returns a Promise containing the Order with the id.
     */
    addOrder(order) {
        return client_1.prisma.order
            .create({ data: Object.assign(Object.assign({}, order), { hasPaid: false }) })
            .then((order) => order)
            .catch(() => {
            // This handles cases where the order schema passed is incorrect.
            throw new Error("Order details seem to be incorrect. This could happen if the product Id is wrong or the details passed are incorrect.");
        });
    }
    /**
     * Method to delete an order from the db.
     * @param orderId A number representing the order to delete
     * @returns A promise containing the deleted order.
     */
    deleteOrder(orderId) {
        return client_1.prisma.order
            .delete({
            where: { id: orderId },
        })
            .then((order) => order)
            .catch(() => {
            // This handles the case where the order id is not found.
            throw new Error("The order id to delete is not found.");
        });
    }
    /**
     * Method to get an order from the db.
     * @param orderId A number representing the order to retrieve.
     * @returns A promise containing the order or null.
     */
    getOrder(orderId) {
        return client_1.prisma.order
            .findUnique({
            where: { id: orderId },
        })
            .then((order) => order)
            .catch(() => {
            // The order id is not found.
            throw new Error("The order id is not found.");
        });
    }
    /**
     * Method to complete the payment for an order.
     * @param orderId A number representing the order to pay for.
     * @param paymentRef A string containing the payment amount.
     * @returns A promise of boolean.
     */
    completePaymentForOrder(orderId, paymentRef) {
        return this.getOrder(orderId).then((order) => {
            if (!order) {
                throw new Error("Order id does not exist");
            }
            if (order.hasPaid) {
                throw new Error("Order is already paid for");
            }
            if (order.price != Number(paymentRef)) {
                throw new Error("Incorrect amount has been sent for the order");
            }
            return client_1.prisma.order
                .update({
                where: { id: orderId },
                data: { hasPaid: true },
            })
                .then(() => true)
                .catch(() => {
                throw new Error("Some error occurred with the payment. Please try again after some time.");
            });
        });
    }
}
exports.default = OrderManager;
//# sourceMappingURL=OrderManager.js.map