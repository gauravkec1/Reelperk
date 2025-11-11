/**
 * Socket.io Service
 * Real-time updates for orders, notifications, etc.
 */

let io;

function initialize(socketIo) {
  io = socketIo;

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join restaurant room
    socket.on('join-restaurant', (restaurantId) => {
      socket.join(`restaurant-${restaurantId}`);
      console.log(`Socket ${socket.id} joined restaurant ${restaurantId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

/**
 * Emit order update to restaurant
 */
function emitOrderUpdate(restaurantId, order) {
  if (io) {
    io.to(`restaurant-${restaurantId}`).emit('order-update', order);
  }
}

/**
 * Emit notification to user
 */
function emitNotification(userId, notification) {
  if (io) {
    io.to(`user-${userId}`).emit('notification', notification);
  }
}

module.exports = {
  initialize,
  emitOrderUpdate,
  emitNotification,
};

