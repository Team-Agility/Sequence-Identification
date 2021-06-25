# Sequence Identification

## Getting Started

1. Install Python 3:

      Go to [install Python 3](https://www.python.org/downloads/)
      

2. Download Dataset

    Estimated Size: 1.94 GiB.

    ```
    $ cd Backend
    $ python download_dataset.py
    ```

3. Update Dataset

    ```
    $ cd Backend
    $ python download_dataset.py
    ```

<hr/>

## Usage
  
1. Configure AWS CLI:

    * [Intall AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html)

    ```
    $ aws configure
        AWS Access Key ID: ****************
        AWS Secret Access Key: ****************
        Default region name: ap-southeast-1
        Default output format: json
    ```

2. Install Required Python Packages:

    ```
    $ cd Backend
    $ pip install -r requirements.txt
    $ python config_nltk.py
    ```
    
3. Serve Backend Locally:

    ```
    $ cd Backend
    $ python serve.py
    ```

    - Serve at: [http://localhost:5000](http://localhost:5000)
    - API doc: [https://documenter.getpostman.com/view/5662193/TzeZE6Ty](https://documenter.getpostman.com/view/5662193/TzeZE6Ty)

4. Serve Frontend Locally:

    ```
    $ cd Frontend
    $ npm install
    $ npm start
    ```

    - Serve at: [http://localhost:3000](http://localhost:3000)
