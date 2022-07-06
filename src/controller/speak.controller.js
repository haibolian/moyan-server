
class SpeakController {
  async publish(ctx) {
    ctx.body = 'publish成功';
  }
}

module.exports = new SpeakController()