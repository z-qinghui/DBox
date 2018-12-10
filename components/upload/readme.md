
文件选择上传和拖拽上传控件。

#### **何时使用**

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

#### **点击上传**
```jsx
const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
<Upload {...props}>
  <Button type='primary'>
    <Icon type='plus' />点击上传
  </Button>
</Upload>
```

#### **用户头像**
```jsx
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
class UploadView extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        action='//jsonplaceholder.typicode.com/posts/'
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    )
  }

}
<UploadView />
```

#### **已上传的文件列表**
```jsx
const props = {
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [{
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  }, {
    uid: '3',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  }],
};
<Upload {...props}>
  <Button>
    <Icon type='plus' />上传的列表
  </Button>
</Upload>

```

#### **照片墙**
```jsx
class PictureWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleCancel() {
    this.setState({
      previewVisible: false,
    })
  }
  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange({fileList}) {
    this.setState({
      fileList,
    })
  }
  render() {
    const { previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='idoll-upload-text'>Upload</div>
      </div>
    );
    return (
      <div className='clearfix'>
        <Upload
          action='//jsonplaceholder.typicode.com/posts/'
          listType='picture-card'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
<PictureWall />
```

#### **拖拽上传**
```jsx
const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
<Dragger {...props}>
  <p >
    <Icon type='plus' />
  </p>
  <p >将文件拖到此处，或点击上传</p>
  <p >支持jpg/png文件格式，且不超过1024kb</p>
</Dragger>
```

#### **手动上传**
```jsx
const reqwest = require('./index.jsx');
class UploadView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false
    }
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload() {
    const {fileList} = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    this.setState({
      uploading: true
    });
    reqwest({
      url: '//jsonplaceholder.typicode.com/posts/',
        method: 'post',
        processData: false,
        data: formData,
        success: () => {
          this.setState({
            fileList: [],
            uploading: false,
          });
          message.success('upload successfully.');
        },
        error: () => {
          this.setState({
            uploading: false,
          });
          message.error('upload failed.');
        },
    });
  }
  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="plus" />选择文件
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : '开始上传' }
        </Button>
      </div>
    )
  }
}
<UploadView />
```

#### **控制筛选出成功上传的文件**
```jsx
class UploadView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      }]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(info) {
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. Filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return false;
    });

    this.setState({ fileList });
  }

  render () {
     const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    );
  }
}
<UploadView />
```

#### **upload**

| 参数   |   说明   |     类型        | 默认值 |
|------------|------------| ----------- |-------|
| name   | 可选参数, 上传的文件   | String      | file  |
| defaultFileList | 可选参数，默认已经上传的文件列表 | Array[Object] | 无  |
| fileList   | 可选参数，已经上传的文件列表 | Array[Object] | 无 |
| action     | 必选参数, 上传的地址  | String |   无  |
| data       | 可选参数, 上传所需参数或返回上传参数的方法 | Object or function(file) | 无 |
| headers    | 可选参数, 设置上传的请求头部，IE10 以上有效 | Object      | 无  |
| showUploadList | 可选参数, 是否展示 uploadList, 默认开启 | Boolean     | true  |
| multiple   | 可选参数, 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件。  | Boolean     | false |
| accept     | 可选参数, 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)    | String      | 无    |
| beforeUpload | 可选参数, 上传文件之前的钩子，参数为上传的文件，若返回 `false` 或者 Promise 则停止上传。**注意：该方法不支持老 IE**。 | Function    | 无    |
| onChange   | 可选参数, 上传文件改变时的状态，详见 onChange                | Function    | 无    |
| listType   | 上传列表的内建样式，支持两种基本样式 `text` or `picture`     | String      | 'text'|
| onPreview  | 点击文件链接时的回调                                       | Function(file) | 无    |
| onRemove   | 点击移除文件时的回调                                       | Function(file) | 无    |
| supportServerRender | 服务端渲染时需要打开这个                           | Boolean | false    |
| disabled | 是否禁用                           | Boolean | false    |

### onChange

上传中、完成、失败都会调用这个函数。

文件状态改变的回调，返回为：

```jsx static
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` 当前操作的文件对象。

   ```jsx static
   {
      uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
      name: 'xx.png'   // 文件名
      status: 'done',  // 状态有：uploading done error removed
      response: '{"status": "success"}',  // 服务端响应内容
   }
   ```
2. `fileList` 当前的文件列表。
3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

