import { Component } from "react"
import axios from "axios"

import { pageWrapper } from "utils/wrapper"

class AboutPage extends Component {
  static async getInitialProps(ctx) {
    return {}
  }

  static pageInfo = {
    title: "About me - Trần Việt Thắng"
  }

  render() {
    return (
      <div className="syn-content" style={{ maxWidth: 600, margin: "30px auto" }}>

        <div className="syn-bio">
          Xin chào, <br /><br />

          Mình là Thắng. Mình xuất thân từ một người chuyên tự nhiên vì thế nên văn mình khá kém.
          Chính vì thế mình đã tạo blog này để note lại những gì mình đã nghiên cứu được để hiểu sâu vấn đề hơn.
          Hay chỉ đơn giản là chia sẻ những câu chuyện thú vị. <br /><br />

          Đối với mình việc chia sẻ kiến thức là một điều rất có ý nghĩa.
          Do mình học trái ngành (kinh tế) và mới chuyển sang software development nên việc tự học là điều tất yếu
          phải làm. Hầu hết các resources mình học qua là các tuts, các bài viết được chia sẻ trên mạng.
          Nên mình cũng rất mong muốn được chia sẻ kiến thức của mình đến mọi người trong điều kiện thời
          gian cho phép.<br /><br />

          Và tất nhiên với một newbie như mình thì việc hiểu sai vấn đề là chuyện khá bình thường.
          Mình còn trẻ trâu nữa nên khó tránh khỏi sai lầm.
          Vì vậy mình xin nhất tất cả gạch đá yêu thương từ mọi người :D<br /><br />

          Mong mọi người ủng hộ :))
        </div>
      </div>
    )
  }
}

export default pageWrapper(null)(AboutPage)