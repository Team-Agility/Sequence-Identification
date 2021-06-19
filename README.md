# Sequence Identification

## Getting Started

1. Install Python 3:

      Go to [install Python 3](https://www.python.org/downloads/)

2. Install Required Python Packages:

    ```
    $ pip install -r requirements.txt
    $ python config_nltk.py
    ```

3. Download Dataset

    Estimated Size: 1.94 GiB.

    ```
    $ python download_dataset.py
    ```

4. Update Dataset

    ```
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

2. Serve Locally:

    ```
    python serve.py
    ```

Serve at: [http://localhost:5000](http://localhost:5000)